
import { LayoutProps } from '@/models/common';
import Link from 'next/link';
import * as React from 'react';




export default function EmptyLayout ({children}: LayoutProps) {
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
