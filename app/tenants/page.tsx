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

export default function TenantsPage() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>({ name: '', email: '', phone: '' });
  const [editing, setEditing] = useState<any>(null);
  const { toast } = useToast();

  // Fetch tenants on load
  useEffect(() => {
    fetchTenants();
  }, []);

  // Fetch tenants from the API
  async function fetchTenants() {
    setLoading(true);
    try {
      const data = await get('/api/tenants');
      setTenants(data);
    } catch {
      toast({ title: 'Error', description: 'Failed to fetch tenants', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  // Handle form submission for add/edit
  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      if (editing) {
        await put(`/api/tenants/${editing.id}`, form);
        toast({ title: 'Success', description: 'Tenant updated successfully' });
      } else {
        await post('/api/tenants', form);
        toast({ title: 'Success', description: 'Tenant added successfully' });
      }
      fetchTenants();
      setForm({ name: '', email: '', phone: '' });
      setEditing(null);
    } catch {
      toast({ title: 'Error', description: 'Failed to save tenant', variant: 'destructive' });
    }
  }

  // Delete a tenant
  async function handleDelete(id: number) {
    try {
      await del(`/api/tenants/${id}`);
      toast({ title: 'Success', description: 'Tenant deleted successfully' });
      fetchTenants();
    } catch {
      toast({ title: 'Error', description: 'Failed to delete tenant', variant: 'destructive' });
    }
  }

  // Populate form for editing
  function handleEdit(tenant: any) {
    setForm(tenant);
    setEditing(tenant);
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Tenants</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add/Edit Tenant Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter tenant name"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter tenant email"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="Enter tenant phone number"
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {editing ? 'Update Tenant' : 'Add Tenant'}
            </Button>
          </form>

          {/* Tenants Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell>{tenant.name}</TableCell>
                  <TableCell>{tenant.email}</TableCell>
                  <TableCell>{tenant.phone}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => handleEdit(tenant)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(tenant.id)}>
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
