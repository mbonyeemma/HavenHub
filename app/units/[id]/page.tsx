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
import { useParams } from 'next/navigation'

interface unit {
  property_id: number;
  name: string;
  price: string;
  period: string;
}

export default function Units() {
    const params = useParams()
    const [units, setUnits] = useState<unit[]>([])
    const [searchTerm, setSearchTerm] = useState('')
    const [newUnit, setNewUnit] = useState<Omit<unit, 'property_id'>>({
        name: '',
        price: '',
        period: 'Per Month'
    })
    const [isunitDialogOpen, setIsunitDialogOpen] = useState(false)
    //const [isLoading, setIsLoading] = useState(true)
    //const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchUnits()
    }, [])

  const fetchUnits = async () => {
    //setIsLoading(true)
    try {
      const response = await get(`/properties/units/${params.id}`)
      setUnits(response.data)
    } catch (error) {
      console.error('Error fetching properties:', error)
      //setError('Error fetching properties. Please try again later.')
    } finally {
      //setIsLoading(false)
    }
  }

  const handleAddUnit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(":: newUnit ::", newUnit)
    try {
      await post('/properties/addUnit', { ...newUnit, property_id: params.id })
      setIsunitDialogOpen(false)
      setNewUnit({
        name: '',
        price: '',
        period: 'Per Month'
      })
      fetchUnits()
    } catch (err) {
      console.error('Error adding unit:', err)
      //setError('Error adding unit. Please try again.')
    }
  }

  const handleDeleteUnit = async (id: string) => {
    try {
      await del(`/properties/units/${id}`)
      fetchUnits()
    } catch (error) {
      console.error('Error deleting unit:', error)
    }
  }

  const filteredUnits = units.filter(unit =>
    unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    unit.price.toLowerCase().includes(searchTerm.toLowerCase())
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
            <h1 className="text-3xl font-bold text-gray-900">Units</h1>
            <Dialog open={isunitDialogOpen} onOpenChange={setIsunitDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add unit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Unit</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new unit here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddUnit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={newUnit.name}
                        onChange={(e) => setNewUnit({...newUnit, name: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="district" className="text-right">
                        Price
                      </Label>
                      <Input
                        id="district"
                        value={newUnit.price}
                        onChange={(e) => setNewUnit({...newUnit, price: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Period
                      </Label>
                      <Select
                        value={newUnit.period}
                        onValueChange={(value: 'Per Month' | 'Per Year') => setNewUnit({...newUnit, period: value})}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Per Month">Per Month</SelectItem>
                          <SelectItem value="Per Year">Per Year</SelectItem>
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
              <CardTitle>Search Units</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Search by unit name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Unit List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>price</TableHead>
                    <TableHead>period</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUnits.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium">{unit.name}</TableCell>
                      <TableCell>{unit.price}</TableCell>
                      <TableCell>{unit.period}</TableCell>
                      <TableCell>
                              <Button onClick={() => handleDeleteUnit(`${unit.id}`)} variant="destructive" size="sm" >Delete</Button>
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

