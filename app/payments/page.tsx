'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { get, post, put, del } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

export default function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>({ amount: '', description: '', date: '' });
  const [editing, setEditing] = useState<any>(null);
  const { toast } = useToast();

  // Fetch payments on load
  useEffect(() => {
    fetchPayments();
  }, []);

  // Fetch payments from the API
  async function fetchPayments() {
    setLoading(true);
    try {
      const data = await get('/api/payments');
      setPayments(data);
    } catch {
      toast({ title: 'Error', description: 'Failed to fetch payments', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  // Handle form submission for add/edit
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      if (editing) {
        await put(`/api/payments/${editing.id}`, form);
        toast({ title: 'Success', description: 'Payment updated successfully' });
      } else {
        await post('/api/payments', form);
        toast({ title: 'Success', description: 'Payment added successfully' });
      }
      fetchPayments();
      setForm({ amount: '', description: '', date: '' });
      setEditing(null);
    } catch {
      toast({ title: 'Error', description: 'Failed to save payment', variant: 'destructive' });
    }
  }

  // Delete a payment
  async function handleDelete(id: number) {
    try {
      await del(`/api/payments/${id}`);
      toast({ title: 'Success', description: 'Payment deleted successfully' });
      fetchPayments();
    } catch {
      toast({ title: 'Error', description: 'Failed to delete payment', variant: 'destructive' });
    }
  }

  // Populate form for editing
  function handleEdit(payment: any) {
    setForm(payment);
    setEditing(payment);
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add/Edit Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                placeholder="Enter payment amount"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Enter payment description"
                required
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {editing ? 'Update Payment' : 'Add Payment'}
            </Button>
          </form>

          {/* Payments Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Amount</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.description}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => handleEdit(payment)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(payment.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
