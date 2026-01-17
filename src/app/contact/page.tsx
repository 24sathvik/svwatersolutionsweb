"use client"

import { useState } from 'react'
import emailjs from "emailjs-com"
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  MessageCircle,
  Send,
  CheckCircle2
} from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    emailjs
      .sendForm(
        "service_mv7qh1v",      // ✅ Service ID
        "template_pp7mvyv",     // ✅ Template ID
        e.currentTarget,
        "A7T85fQ__RaaiwpkC"      // ✅ Public Key
      )
      .then(() => {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        })
      })
      .catch(() => {
        setError("Failed to send message. Please try again.")
      })
      .finally(() => setIsSubmitting(false))
  }

  const whatsappNumber = '918297612490'
  const whatsappMessage = encodeURIComponent(
    'Hi, I would like to inquire about your water purification solutions.'
  )

  return (
    <main className="min-h-screen bg-off-white pt-24">
      {/* Hero Section */}
      <section className="bg-charcoal py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Get in Touch</h1>
            <p className="text-lg text-gray-300">
              Have questions? We're here to help. Reach out to us through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT INFO COLUMN (unchanged) */}
          <div className="space-y-6">
            <Card className="border-2 border-aqua bg-gradient-to-br from-aqua/10 to-aqua/5">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-aqua">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-charcoal">Quick Response</h3>
                    <p className="text-sm text-muted-foreground">Chat with us now</p>
                  </div>
                </div>
                <Button size="lg" className="w-full bg-aqua text-white hover:bg-aqua-dark" asChild>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Message on WhatsApp
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-charcoal mb-2">Email Us</h3>
                <a
                  href="mailto:svwatersolutions.26@gmail.com"
                  className="font-medium text-aqua hover:underline"
                >
                  svwatersolutions.26@gmail.com
                </a>
              </CardContent>
            </Card>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6 md:p-8">
                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-600" />
                    <h3 className="mb-2 text-2xl font-bold text-charcoal">Message Sent!</h3>
                    <p className="mb-6 text-muted-foreground">
                      Thank you for contacting us. We'll get back to you soon.
                    </p>
                    <Button onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="mb-6 text-2xl font-bold text-charcoal">Send us a Message</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* IMPORTANT: hidden subject input for EmailJS */}
                      <input type="hidden" name="subject" value={formData.subject} />

                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <Label>Full Name *</Label>
                          <Input
                            name="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          />
                        </div>

                        <div>
                          <Label>Phone Number *</Label>
                          <Input
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Email Address *</Label>
                        <Input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>

                      <div>
                        <Label>Subject *</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) =>
                            setFormData({ ...formData, subject: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Product Inquiry">Product Inquiry</SelectItem>
                            <SelectItem value="Service Request">Service Request</SelectItem>
                            <SelectItem value="AMC Plan">AMC Plan</SelectItem>
                            <SelectItem value="Complaint">Complaint</SelectItem>
                            <SelectItem value="Feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Message *</Label>
                        <Textarea
                          name="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                        />
                      </div>

                      {error && <p className="text-red-600">{error}</p>}

                      <Button
                        type="submit"
                        size="lg"
                        className="bg-aqua text-white hover:bg-aqua-dark"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
