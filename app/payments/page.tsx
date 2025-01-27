'use client'

import { useState } from 'react'
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
import { Plus, DollarSign } from 'lucide-react'

// Mock data for payments
const initialPayments = [
  { id: 1, tenant: 'John Doe', property: 'Sunset Apartments', amount: 1200, date: '2023-05-01', status: 'Paid' },
  { id: 2, tenant: 'Jane Smith', property: 'Downtown Lofts', amount: 1500, date: '2023-05-02', status: 'Pending' },
  { id: 3, tenant: 'Bob Johnson', property: 'Riverside Condos', amount: 1800, date: '2023-05-03', status: 'Overdue' },
  { id: 4, tenant: 'Alice Brown', property: 'Mountain View Homes', amount: 1000, date: '2023-05-04', status: 'Paid' },
  { id: 5, tenant: 'Charlie Davis', property: 'Beachside Villas', amount: 2000, date: '2023-05-05', status: 'Pending' },
]

export default function Payments() {
  const [payments, setPayments] = useState(initialPayments)
  const [searchTerm, setSearchTerm] = useState('')
  const [newPayment, setNewPayment] = useState({ tenant: '', property: '', amount: '', date: '', status: 'Pending' })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredPayments = payments.filter(payment =>
    payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault()
    const id = payments.length + 1
    const newPaymentWithId = { ...newPayment, id, amount: parseFloat(newPayment.amount) }
    setPayments([...payments, newPaymentWithId])
    setNewPayment({ tenant: '', property: '', amount: '', date: '', status: 'Pending' })
    setIsDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
    

      <main className="py-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Payment
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Payment</DialogTitle>
                  <DialogDescription>
                    Enter the details of the new payment here. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddPayment}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="tenant" className="text-right">
                        Tenant
                      </Label>
                      <Input
                        id="tenant"
                        value={newPayment.tenant}
                        onChange={(e) => setNewPayment({...newPayment, tenant: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="property" className="text-right">
                        Property
                      </Label>
                      <Input
                        id="property"
                        value={newPayment.property}
                        onChange={(e) => setNewPayment({...newPayment, property: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="amount" className="text-right">
                        Amount
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        value={newPayment.amount}
                        onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Date
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={newPayment.date}
                        onChange={(e) => setNewPayment({...newPayment, date: e.target.value})}
                        className="col-span-3"
                      />
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
              <CardTitle>Search Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Search by tenant, property, or status"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.tenant}</TableCell>
                      <TableCell>{payment.property}</TableCell>
                      <TableCell>${payment.amount}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.status}</TableCell>
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

