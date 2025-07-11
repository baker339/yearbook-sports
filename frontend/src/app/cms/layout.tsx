'use client';
import * as React from 'react';
import { CmsNavProvider } from '@/components/cms/CmsNavContext';
import CmsSidebar from '@/components/cms/CmsSidebar';

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <CmsNavProvider>
      <div className="flex min-h-screen">
        <CmsSidebar />
        <main className="flex-1 p-8 bg-gray-50">{children}</main>
      </div>
    </CmsNavProvider>
  );
} 