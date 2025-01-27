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
import { Home, Plus, Bell } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { get, post, put, del } from '@/services/api'

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

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [newProperty, setNewProperty] = useState<Omit<Property, 'id'>>({
    name: '',
    district: '',
    address: '',
    type: 'residential',
    hasUnits: false,
    rentalAmount: undefined,
    rentalPeriod: 'per month'
  })
  const [isPropertyDialogOpen, setIsPropertyDialogOpen] = useState(false)
  //const [isLoading, setIsLoading] = useState(true)
  //const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    //setIsLoading(true)
    try {
      const response = await get('/properties')
      setProperties(response.data)
    } catch (error) {
      console.error('Error fetching properties:', error)
      //setError('Error fetching properties. Please try again later.')
    } finally {
      //setIsLoading(false)
    }
  }

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(":: newProperty ::", newProperty)
    try {
      await post('/properties/addProperty', newProperty)
      setIsPropertyDialogOpen(false)
      setNewProperty({
        name: '',
        district: '',
        address: '',
        type: 'residential',
        hasUnits: false,
        rentalAmount: undefined,
        rentalPeriod: 'per month'
      })
      fetchProperties()
    } catch (err) {
      console.error('Error adding property:', err)
      //setError('Error adding property. Please try again.')
    }
  }

  const handleDeleteProperty = async (id: number) => {
    try {
      await del(`/properties/properties/${id}`)
      fetchProperties()
    } catch (error) {
      console.error('Error deleting property:', error)
    }
  }

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.district.toLowerCase().includes(searchTerm.toLowerCase())
  )

  //if (isLoading) {
  //  return <div>Loading...</div>
  //}

  //if (error) {
  //  return <div>{error}</div>
  //}

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <span className="text-2xl font-bold text-gray-800">Bava Rentals</span>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/properties" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Properties
                </Link>
                <Link href="/tenants" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Tenants
                </Link>
                <Link href="/payments" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Payments
                </Link>
                <Link href="/reports" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Reports
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Button variant="ghost">
                <Bell className="h-5 w-5" />
                <span className="sr-only">View notifications</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
            <Dialog open={isPropertyDialogOpen} onOpenChange={setIsPropertyDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Property
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Property</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new property here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddProperty}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newProperty.name}
                        onChange={(e) => setNewProperty({...newProperty, name: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="district" className="text-right">
                        District
                      </Label>
                      <Input
                        id="district"
                        value={newProperty.district}
                        onChange={(e) => setNewProperty({...newProperty, district: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="address" className="text-right">
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={newProperty.address}
                        onChange={(e) => setNewProperty({...newProperty, address: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Select
                        value={newProperty.type}
                        onValueChange={(value: 'residential' | 'commercial') => setNewProperty({...newProperty, type: value})}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="hasUnits" className="text-right">
                        Has Units
                      </Label>
                      <Select
                        value={newProperty.hasUnits ? "yes" : "no"}
                        onValueChange={(value) => setNewProperty({...newProperty, hasUnits: value === "yes"})}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {!newProperty.hasUnits && (
                      <>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="rentalAmount" className="text-right">
                            Rental Amount
                          </Label>
                          <Input
                            id="rentalAmount"
                            type="number"
                            value={newProperty.rentalAmount?.toString() || ''}
                            onChange={(e) => setNewProperty({...newProperty, rentalAmount: parseFloat(e.target.value)})}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="rentalPeriod" className="text-right">
                            Rental Period
                          </Label>
                          <Select
                            value={newProperty.rentalPeriod}
                            onValueChange={(value) => setNewProperty({...newProperty, rentalPeriod: value})}
                          >
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="per month">Per Month</SelectItem>
                              <SelectItem value="per year">Per Year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
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
              <CardTitle>Search Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Search by property name, address, or district"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Property List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>District</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.name}</TableCell>
                      <TableCell>{property.district}</TableCell>
                      <TableCell>{property.address}</TableCell>
                      <TableCell>{property.type}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/properties/${property.id}`}>
                            View Details
                          </Link>
                        </Button>
                        <Button onClick={() => handleDeleteProperty(property.id)} variant="destructive" size="sm" >Delete</Button>
                        {property.has_units === 1 && (<Button variant="outline" size="sm">
                          <Link href={`/units/${property.id}`}>
                            View Units
                          </Link>
                        </Button>)}
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

