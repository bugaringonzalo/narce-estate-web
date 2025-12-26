// src/app/(marketing)/contacto/page.tsx
'use client';

import { useState } from 'react';
import {
  Mail24Regular,
  Phone24Regular,
  Location24Regular,
  Send24Regular,
  Checkmark24Regular,
} from '@fluentui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar el mensaje');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Contactanos
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Estamos acá para ayudarte. Envianos tu consulta y te responderemos
              a la brevedad.
            </p>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Información de contacto */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información de contacto</CardTitle>
                <CardDescription>
                  También podés contactarnos directamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Mail24Regular className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a
                      href="mailto:contacto@narce.com"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      contacto@narce.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone24Regular className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Teléfono</p>
                    <a
                      href="tel:+5491112345678"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      +54 9 11 1234-5678
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Location24Regular className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Ubicación</p>
                    <p className="text-sm text-muted-foreground">
                      Buenos Aires, Argentina
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Horarios de atención</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Lunes a Viernes</span>
                    <span>9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sábados</span>
                    <span>10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Domingos</span>
                    <span>Cerrado</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envianos tu consulta</CardTitle>
                <CardDescription>
                  Completá el formulario y te contactaremos pronto
                </CardDescription>
              </CardHeader>
              <CardContent>
                {success ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <Checkmark24Regular className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold">Mensaje enviado</h3>
                    <p className="mt-2 text-muted-foreground">
                      Gracias por contactarnos. Te responderemos a la brevedad.
                    </p>
                    <Button
                      className="mt-6"
                      variant="outline"
                      onClick={() => setSuccess(false)}
                    >
                      Enviar otra consulta
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                        {error}
                      </div>
                    )}

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Tu nombre"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={loading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+54 9 11 1234-5678"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={loading}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Asunto</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Asunto de tu consulta"
                          value={formData.subject}
                          onChange={handleChange}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje *</Label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Escribí tu mensaje acá..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>

                    <Button type="submit" className="w-full gap-2" disabled={loading}>
                      <Send24Regular className="h-4 w-4" />
                      {loading ? 'Enviando...' : 'Enviar mensaje'}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
