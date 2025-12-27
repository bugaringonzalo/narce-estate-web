// src/app/(marketing)/contacto/page.tsx
'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  SectionTransition,
  TextReveal,
  StaggerGrid,
  FormFlyAway,
  FormSuccessAnimation,
} from '@/components/animations';

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
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

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
      setShowSuccessAnimation(true);
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

  const handleSuccessAnimationComplete = () => {
    setShowSuccessAnimation(false);
  };

  const handleNewMessage = () => {
    setSuccess(false);
    setShowSuccessAnimation(false);
  };

  return (
    <div className="min-h-screen">
      {/* Animacion de exito espectacular */}
      <FormSuccessAnimation
        isVisible={showSuccessAnimation}
        onComplete={handleSuccessAnimationComplete}
        message="¡Mensaje enviado!"
        submessage="Te responderemos a la brevedad"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <TextReveal
              as="h1"
              type="words"
              className="text-4xl font-bold tracking-tight sm:text-5xl"
              useScrollTrigger={false}
            >
              Contactanos
            </TextReveal>
            <SectionTransition type="blur-in" delay={0.3} duration={0.8}>
              <p className="mt-4 text-lg text-muted-foreground">
                Estamos acá para ayudarte. Envianos tu consulta y te responderemos
                a la brevedad.
              </p>
            </SectionTransition>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Información de contacto */}
          <StaggerGrid className="space-y-6" stagger={0.15} direction="left">
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
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a
                      href="mailto:contacto@narce.com"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      contacto@narce.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Teléfono</p>
                    <a
                      href="tel:+5491112345678"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      +54 9 11 1234-5678
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
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
          </StaggerGrid>

          {/* Formulario */}
          <div className="lg:col-span-2">
            <SectionTransition type="slide-right" delay={0.2}>
              <Card>
                <CardHeader>
                  <CardTitle>Envianos tu consulta</CardTitle>
                  <CardDescription>
                    Completá el formulario y te contactaremos pronto
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {success && !showSuccessAnimation ? (
                    <SectionTransition type="zoom-in" duration={0.5}>
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                          <svg
                            className="h-8 w-8 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold">Mensaje enviado</h3>
                        <p className="mt-2 text-muted-foreground">
                          Gracias por contactarnos. Te responderemos a la brevedad.
                        </p>
                        <Button
                          className="mt-6"
                          variant="outline"
                          onClick={handleNewMessage}
                        >
                          Enviar otra consulta
                        </Button>
                      </div>
                    </SectionTransition>
                  ) : (
                    <FormFlyAway isSubmitting={loading} isSuccess={success && showSuccessAnimation}>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                          <SectionTransition type="glitch" duration={0.3}>
                            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                              {error}
                            </div>
                          </SectionTransition>
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
                              className="transition-all focus:scale-[1.02]"
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
                              className="transition-all focus:scale-[1.02]"
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
                              className="transition-all focus:scale-[1.02]"
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
                              className="transition-all focus:scale-[1.02]"
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
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all focus:scale-[1.01]"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                          disabled={loading}
                        >
                          <Send className="h-4 w-4" />
                          {loading ? 'Enviando...' : 'Enviar mensaje'}
                        </Button>
                      </form>
                    </FormFlyAway>
                  )}
                </CardContent>
              </Card>
            </SectionTransition>
          </div>
        </div>
      </section>
    </div>
  );
}
