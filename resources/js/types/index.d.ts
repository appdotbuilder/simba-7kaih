import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface Role {
    id: number;
    name: string;
    display_name: string;
    description: string | null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    role_id: number | null;
    role?: Role;
    nis?: string;
    nip?: string;
    phone?: string;
    birth_date?: string;
    gender?: 'male' | 'female';
    address?: string;
    avatar_url?: string;
    is_active: boolean;
    last_login_at?: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}
