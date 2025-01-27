'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import { get, post, put, del } from '@/services/api'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
}

interface Property {
  id: number;
  name: string;
  district: string;
  address: string;
  type: 'residential' | 'commercial';
  hasUnits: boolean;
  rentalAmount?: number;
  rentalPeriod?: string;
}

interface Unit {
  property_id: number;
  name: string;
  price: string;
  period: string;
}

export default function Tenants() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [properties, setProperties] = useState<Unit[]>([])
  const [units, setUnits] = useState<Property[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newTenant, setNewTenant] = useState<Omit<Tenant, 'id'>>({
    name: '',
    email: '',
    phone: '',
    property: '',
    unit: ''
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTenants()
    fetchProperties()
    fetchUnits()
  }, [])

  const fetchTenants = async () => {
    try {
      const response = await get('/tenants')
      setTenants(response.data)

    } catch (err) {
      console.log('Error fetching tenants. Please try again later.')
    } finally {
    }
  }

  const fetchProperties = async () => {
    //setIsLoading(true)
    try {
      const response = await get('/properties')
      setProperties(response.data)
    } catch (error) {
      console.error('Error fetching properties:', error)
    } finally {
      //setIsLoading(false)
    }
  }

  const fetchUnits = async (id: string) => {
    try {
      const response = await get(`/properties/units/${id}`)
      setUnits(response.data)
    } catch (error) {
      console.error('Error fetching units:', error)
    } finally {

    }
  }

  const handleAddTenant = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      
      await post('/tenants/addTenants', newTenant)
      setIsDialogOpen(false)
      setNewTenant({
        name: '',
        email: '',
        phone: '',
        property: '',
        unit: ''
      })
      fetchTenants()
    } catch (err) {
      setError('Error adding tenant. Please try again.')
    }
  }

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.property.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        {/* Navigation content (unchanged) */}
      </nav>

      <main className="py-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Tenants</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Tenant
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Tenant</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new tenant here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddTenant}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newTenant.name}
                        onChange={(e) => setNewTenant({...newTenant, name: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={newTenant.email}
                        onChange={(e) => setNewTenant({...newTenant, email: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone" className="text-right">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={newTenant.phone}
                        onChange={(e) => setNewTenant({...newTenant, phone: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Property
                      </Label>
                      <Select
                        value={newTenant.property}
                        onValueChange={(value) => {
                          setNewTenant({...newTenant, property: value})
                          fetchUnits(value)
                        }}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            properties.map((property) => (
                              <SelectItem value={String(property.id)}>{property.name}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Unit
                      </Label>
                      <Select
                        value={newTenant.unit}
                        onValueChange={(value) => setNewTenant({...newTenant, unit: value})}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            units.map((unit) => (
                              <SelectItem value={String(unit.id)}>{unit.name}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Search Tenants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Search by tenant name, email, or property"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tenant List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTenants.map((tenant) => (
                    <TableRow key={tenant.id}>
                      <TableCell className="font-medium">{tenant.name}</TableCell>
                      <TableCell>{tenant.email}</TableCell>
                      <TableCell>{tenant.phone}</TableCell>
                      <TableCell>{tenant.property}</TableCell>
                      <TableCell>{tenant.unit}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

