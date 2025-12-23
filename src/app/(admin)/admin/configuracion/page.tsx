'use client';

import { Settings24Regular } from '@fluentui/react-icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConfigurationPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Configuración</h1>
        <p className="text-muted-foreground">
          Configuración general del sitio
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings24Regular className="h-5 w-5" />
            Próximamente
          </CardTitle>
          <CardDescription>
            Esta sección estará disponible pronto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Aquí podrás configurar:
          </p>
          <ul className="mt-4 list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Información de contacto de la inmobiliaria</li>
            <li>Redes sociales</li>
            <li>Textos del sitio</li>
            <li>Logo y colores</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
