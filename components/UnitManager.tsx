import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
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

export interface Unit {
  id: number
  number: string
  price: number
  period: string
}

interface UnitManagerProps {
  units: Unit[]
  onUnitsChange: (units: Unit[]) => void
}

export function UnitManager({ units, onUnitsChange }: UnitManagerProps) {
  const [unitNumber, setUnitNumber] = useState('')
  const [unitPrice, setUnitPrice] = useState('')
  const [unitPeriod, setUnitPeriod] = useState('per month')

  const addUnit = () => {
    if (unitNumber && unitPrice) {
      const newUnit: Unit = {
        id: units.length + 1,
        number: unitNumber,
        price: parseFloat(unitPrice),
        period: unitPeriod
      }
      onUnitsChange([...units, newUnit])
      setUnitNumber('')
      setUnitPrice('')
      setUnitPeriod('per month')
    }
  }

  const removeUnit = (id: number) => {
    onUnitsChange(units.filter(unit => unit.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <div className="flex-1">
          <Label htmlFor="unitNumber">Unit Number</Label>
          <Input
            id="unitNumber"
            value={unitNumber}
            onChange={(e) => setUnitNumber(e.target.value)}
            placeholder="e.g., 101"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="unitPrice">Price (USD)</Label>
          <Input
            id="unitPrice"
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            placeholder="e.g., 1000"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="unitPeriod">Period</Label>
          <Input
            id="unitPeriod"
            value={unitPeriod}
            onChange={(e) => setUnitPeriod(e.target.value)}
            placeholder="e.g., per month"
          />
        </div>
        <div className="flex items-end">
          <Button onClick={addUnit}>Add Unit</Button>
        </div>
      </div>
      
      {units.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Unit Number</TableHead>
              <TableHead>Price (USD)</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {units.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell>{unit.number}</TableCell>
                <TableCell>${unit.price}</TableCell>
                <TableCell>{unit.period}</TableCell>
                <TableCell>
                  <Button variant="destructive" size="sm" onClick={() => removeUnit(unit.id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}

