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

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', address: '', type: '' });
  const [editing, setEditing] = useState(null);
  const { toast } = useToast();

  // Fetch properties on load
  useEffect(() => {
    fetchProperties();
  }, []);

  // Fetch properties from the API
  async function fetchProperties() {
    setLoading(true);
    try {
      const data:any = await get('/api/properties');
      setProperties(data);
    } catch {
      toast({ title: 'Error', description: 'Failed to fetch properties', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }

  // Handle form submission for add/edit
  async function handleSubmit(e:any) {
    e.preventDefault();
    try {
      if (editing) {
        await post(`/api/properties/${editing.id}`, form);
        toast({ title: 'Success', description: 'Property updated successfully' });
      } else {
        await post('/api/properties', form);
        toast({ title: 'Success', description: 'Property added successfully' });
      }
      fetchProperties();
      setForm({ name: '', address: '', type: '' });
      setEditing(null);
    } catch {
      toast({ title: 'Error', description: 'Failed to save property', variant: 'destructive' });
    }
  }

  // Delete a property
  async function handleDelete(id:any) {
    try {
      await del(`/api/properties/${id}`);
      toast({ title: 'Success', description: 'Property deleted successfully' });
      fetchProperties();
    } catch {
      toast({ title: 'Error', description: 'Failed to delete property', variant: 'destructive' });
    }
  }

  // Populate form for editing
  function handleEdit(property:any) {
    setForm(property);
    setEditing(property);
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Properties</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add/Edit Property Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter property name"
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Enter property address"
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                placeholder="Enter property type (e.g., Residential, Commercial)"
                required
              />
            </div>
            <Button type="submit" disabled={loading}>
              {editing ? 'Update Property' : 'Add Property'}
            </Button>
          </form>

          {/* Properties Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property:any) => (
                <TableRow key={property.id}>
                  <TableCell>{property.name}</TableCell>
                  <TableCell>{property.address}</TableCell>
                  <TableCell>{property.type}</TableCell>
                  <TableCell>
                    <Button variant="outline" onClick={() => handleEdit(property)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(property.id)}>
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
