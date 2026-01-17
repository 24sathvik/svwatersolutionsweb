"use client"

import { useState } from 'react'
import emailjs from "@emailjs/browser"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Check, 
  Wrench, 
  Shield, 
  Zap, 
  Calendar,
  Phone,
  Mail,
  Clock
} from 'lucide-react'

/* ---------- STATIC DATA ---------- */

const amcPlans = [
  {
    name: 'Basic',
    price: 2999,
    duration: 'per year',
    features: [
      '2 Free Service Visits',
      'Filter Cleaning',
      'Basic Maintenance',
      'Email Support',
      'Service Reports'
    ],
    popular: false
  },
  {
    name: 'Standard',
    price: 5999,
    duration: 'per year',
    features: [
      '4 Free Service Visits',
      'Filter Replacement (1 Set)',
      'Complete Maintenance',
      'Priority Support',
      '10% Discount on Parts',
      'Emergency Service',
      'Service Reports'
    ],
    popular: true
  },
  {
    name: 'Premium',
    price: 8999,
    duration: 'per year',
    features: [
      '6 Free Service Visits',
      'Filter Replacement (2 Sets)',
      'Complete Maintenance',
      '24/7 Priority Support',
      '20% Discount on Parts',
      'Emergency Service',
      'Free Water Testing',
      'Extended Warranty',
      'Service Reports'
    ],
    popular: false
  }
]

const services = [
  {
    icon: Wrench,
    title: 'Installation',
    description: 'Professional installation of all types of water purification systems',
    price: 'Starting at ₹1,499'
  },
  {
    icon: Shield,
    title: 'AMC Plans',
    description: 'Comprehensive annual maintenance contracts for peace of mind',
    price: 'From ₹2,999/year'
  },
  {
    icon: Zap,
    title: 'Repair & Maintenance',
    description: 'Quick and reliable repair services for all brands',
    price: 'Starting at ₹899'
  },
  {
    icon: Calendar,
    title: 'Water Testing',
    description: 'Complete water quality analysis and TDS testing',
    price: 'From ₹749'
  }
]

/* ---------- PAGE ---------- */

export default function ServicesPage() {
  const [serviceData, setServiceData] = useState({
    name: '',
    phone: '',
    email: '',
    service_type: '',
    address: '',
    details: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  /* ---------- EMAILJS SUBMIT ---------- */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    emailjs
      .sendForm(
        "service_mv7qh1v",      // Service ID
        "template_4fv7tij",     // Service Template ID
        e.currentTarget,
        "A7T85fQ__RaaiwpkC"      // Public Key
      )
      .then(() => {
        setIsSubmitted(true)
        setServiceData({
          name: '',
          phone: '',
          email: '',
          service_type: '',
          address: '',
          details: ''
        })
      })
      .catch(() => {
        setError("Failed to submit service request. Please try again.")
      })
      .finally(() => setIsSubmitting(false))
  }

  return (
    <main className="min-h-screen bg-off-white pt-24">

      {/* ---------- HERO ---------- */}
      <section className="bg-charcoal py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Our Services</h1>
          <p className="text-lg text-gray-300">
            Complete water purification services – installation, AMC, repair & maintenance.
          </p>
        </div>
      </section>

      {/* ---------- SERVICES GRID ---------- */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.title} className="text-center hover:shadow-xl">
                  <CardContent className="p-6">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-aqua/10">
                      <Icon className="h-8 w-8 text-aqua" />
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>
                    <div className="font-semibold text-aqua">{service.price}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ---------- SERVICE REQUEST FORM ---------- */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-8">
          <Card>
            <CardContent className="p-6 md:p-8">
              {isSubmitted ? (
                <div className="py-10 text-center">
                  <Check className="mx-auto mb-4 h-10 w-10 text-green-600" />
                  <h3 className="text-2xl font-bold">Request Submitted!</h3>
                  <p className="text-muted-foreground mt-2">
                    Our team will contact you shortly.
                  </p>
                  <Button className="mt-6" onClick={() => setIsSubmitted(false)}>
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* REQUIRED hidden field for EmailJS */}
                  <input
                    type="hidden"
                    name="service_type"
                    value={serviceData.service_type}
                  />

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <Label>Full Name *</Label>
                      <Input
                        name="name"
                        required
                        value={serviceData.name}
                        onChange={(e) => setServiceData({ ...serviceData, name: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label>Phone Number *</Label>
                      <Input
                        name="phone"
                        required
                        value={serviceData.phone}
                        onChange={(e) => setServiceData({ ...serviceData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      name="email"
                      required
                      value={serviceData.email}
                      onChange={(e) => setServiceData({ ...serviceData, email: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Service Type *</Label>
                    <Select
                      value={serviceData.service_type}
                      onValueChange={(value) =>
                        setServiceData({ ...serviceData, service_type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Installation">Installation</SelectItem>
                        <SelectItem value="Repair & Maintenance">Repair & Maintenance</SelectItem>
                        <SelectItem value="AMC Plan">AMC Plan</SelectItem>
                        <SelectItem value="Water Testing">Water Testing</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Service Address *</Label>
                    <Input
                      name="address"
                      required
                      value={serviceData.address}
                      onChange={(e) => setServiceData({ ...serviceData, address: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Additional Details</Label>
                    <Textarea
                      name="details"
                      rows={4}
                      value={serviceData.details}
                      onChange={(e) => setServiceData({ ...serviceData, details: e.target.value })}
                    />
                  </div>

                  {error && <p className="text-red-600">{error}</p>}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-aqua text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
