'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Mail, Clock, CheckCircle, XCircle, MessageSquare, User, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getAllContacts, updateContactStatus } from '@/lib/firebase/firestore';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
  status: 'pending' | 'contacted' | 'closed';
  createdAt: Date;
}

const statusConfig = {
  pending: {
    label: 'Pendiente',
    variant: 'secondary' as const,
    icon: Clock,
  },
  contacted: {
    label: 'Contactado',
    variant: 'default' as const,
    icon: CheckCircle,
  },
  closed: {
    label: 'Cerrado',
    variant: 'outline' as const,
    icon: XCircle,
  },
};

export default function ContactosPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [updating, setUpdating] = useState(false);

  // Cargar contactos
  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const data = await getAllContacts();
      setContacts(data as Contact[]);
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (contactId: string, newStatus: Contact['status']) => {
    setUpdating(true);
    try {
      await updateContactStatus(contactId, newStatus);
      // Actualizar localmente
      setContacts((prev) =>
        prev.map((c) =>
          c.id === contactId ? { ...c, status: newStatus } : c
        )
      );
      if (selectedContact?.id === contactId) {
        setSelectedContact({ ...selectedContact, status: newStatus });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdating(false);
    }
  };

  // Estadísticas
  const stats = {
    total: contacts.length,
    pending: contacts.filter((c) => c.status === 'pending').length,
    contacted: contacts.filter((c) => c.status === 'contacted').length,
    closed: contacts.filter((c) => c.status === 'closed').length,
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Contactos</h1>
        <div className="flex items-center justify-center py-12">
          <span className="text-muted-foreground">Cargando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Contactos</h1>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total</CardDescription>
            <CardTitle className="text-3xl">{stats.total}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pendientes</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">{stats.pending}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Contactados</CardDescription>
            <CardTitle className="text-3xl text-blue-600">{stats.contacted}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Cerrados</CardDescription>
            <CardTitle className="text-3xl text-gray-600">{stats.closed}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Lista de contactos */}
      {contacts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Mail className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-lg font-medium">No hay contactos aún</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Los mensajes del formulario de contacto aparecerán aquí
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Mensajes recibidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contacts.map((contact) => {
                // const StatusIcon = statusConfig[contact.status].icon;
                return (
                  <div
                    key={contact.id}
                    className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{contact.name}</p>
                        <Badge variant={statusConfig[contact.status].variant}>
                          {statusConfig[contact.status].label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{contact.email}</p>
                      <p className="mt-1 text-sm line-clamp-2">{contact.message}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {format(new Date(contact.createdAt), "d 'de' MMMM, yyyy - HH:mm", { locale: es })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de detalle */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-lg">
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  {selectedContact.name}
                </DialogTitle>
                <DialogDescription>
                  {format(new Date(selectedContact.createdAt), "d 'de' MMMM, yyyy - HH:mm", { locale: es })}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* Información de contacto */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${selectedContact.email}`} className="text-primary hover:underline">
                      {selectedContact.email}
                    </a>
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${selectedContact.phone}`} className="text-primary hover:underline">
                        {selectedContact.phone}
                      </a>
                    </div>
                  )}
                  {selectedContact.propertyTitle && (
                    <div className="flex items-center gap-2 text-sm">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <span>Propiedad: {selectedContact.propertyTitle}</span>
                    </div>
                  )}
                </div>

                {/* Mensaje */}
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm whitespace-pre-wrap">{selectedContact.message}</p>
                </div>

                {/* Cambiar estado */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Cambiar estado:</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={selectedContact.status === 'pending' ? 'default' : 'outline'}
                      onClick={() => handleStatusChange(selectedContact.id, 'pending')}
                      disabled={updating}
                    >
                      Pendiente
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedContact.status === 'contacted' ? 'default' : 'outline'}
                      onClick={() => handleStatusChange(selectedContact.id, 'contacted')}
                      disabled={updating}
                    >
                      Contactado
                    </Button>
                    <Button
                      size="sm"
                      variant={selectedContact.status === 'closed' ? 'default' : 'outline'}
                      onClick={() => handleStatusChange(selectedContact.id, 'closed')}
                      disabled={updating}
                    >
                      Cerrado
                    </Button>
                  </div>
                </div>

                {/* Acciones rápidas */}
                <div className="flex gap-2 pt-2">
                  <Button asChild className="flex-1">
                    <a href={`mailto:${selectedContact.email}`}>
                      <Mail className="mr-2 h-4 w-4" />
                      Responder por email
                    </a>
                  </Button>
                  {selectedContact.phone && (
                    <Button asChild variant="outline" className="flex-1">
                      <a href={`https://wa.me/${selectedContact.phone.replace(/\D/g, '')}`} target="_blank">
                        Abrir WhatsApp
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
