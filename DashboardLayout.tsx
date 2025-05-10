
import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  ChevronDown,
  LogOut,
  Menu,
  X,
  Home,
  Link as LinkIcon,
  Smartphone,
  Database,
  ClockIcon,
  Phone,
  User,
  Settings,
  BarChart,
  Shield,
  Cable,
  DollarSign,
  CreditCard,
  Bell,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  count?: number;
  active: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  icon,
  label,
  count,
  active,
  onClick,
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
        active
          ? "bg-primary text-primary-foreground"
          : "hover:bg-primary/10 text-foreground"
      )}
      onClick={onClick}
    >
      <div className="text-lg">{icon}</div>
      <span className="flex-1">{label}</span>
      {count !== undefined && (
        <Badge variant={active ? "outline" : "default"} className={cn(
          active ? "bg-primary-foreground text-primary" : ""
        )}>
          {count}
        </Badge>
      )}
    </Link>
  );
};

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lista de itens do menu
  const menuItems = [
    {
      to: "/dashboard",
      icon: <Home size={20} />,
      label: "Dashboard",
    },
    {
      to: "/dashboard/router-links",
      icon: <LinkIcon size={20} />,
      label: "Roteador de Links",
      count: 12,
    },
    {
      to: "/dashboard/chip-manager",
      icon: <Smartphone size={20} />,
      label: "Gestor de Chips",
      count: 8,
    },
    {
      to: "/dashboard/lead-database",
      icon: <Database size={20} />,
      label: "Banco de Dados",
      count: 354,
    },
    {
      to: "/dashboard/smart-queue",
      icon: <ClockIcon size={20} />,
      label: "Fila Inteligente",
      count: 17,
    },
    {
      to: "/dashboard/call-module",
      icon: <Phone size={20} />,
      label: "Módulo de Ligações",
    },
    {
      to: "/dashboard/lead-panel",
      icon: <User size={20} />,
      label: "Painel de Leads",
    },
    {
      to: "/dashboard/settings",
      icon: <Settings size={20} />,
      label: "Configurações",
    },
    {
      to: "/dashboard/reports",
      icon: <BarChart size={20} />,
      label: "Relatórios",
    },
    {
      to: "/dashboard/security",
      icon: <Shield size={20} />,
      label: "Segurança",
    },
    {
      to: "/dashboard/integrations",
      icon: <Cable size={20} />,
      label: "Integrações",
    },
    {
      to: "/dashboard/financial",
      icon: <DollarSign size={20} />,
      label: "Financeiro",
    },
    {
      to: "/dashboard/subscription",
      icon: <CreditCard size={20} />,
      label: "Assinatura",
    },
  ];

  // Função para lidar com o logout
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Fecha a sidebar ao clicar em um item (mobile)
  const handleSidebarItemClick = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:relative w-64 h-full z-30 transform transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 border-r",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo e botão fechar mobile */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L</span>
              </div>
              <span className="font-bold text-lg">LeadRouter Pro</span>
            </Link>
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Menu items */}
          <div className="flex-1 px-3 py-4 overflow-y-auto">
            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <SidebarItem
                  key={item.to}
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  count={item.count}
                  active={location.pathname === item.to}
                  onClick={handleSidebarItemClick}
                />
              ))}
            </nav>
          </div>

          {/* User info */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user?.name}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {user?.email}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard/subscription")}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Assinatura</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="border-b bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between p-4">
            {/* Menu toggle button */}
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Page title - visible on mobile only */}
            <div className="lg:hidden font-medium">
              {menuItems.find((item) => item.to === location.pathname)?.label || "Dashboard"}
            </div>

            {/* Search box - visible on desktop only */}
            <div className="hidden lg:flex items-center gap-4 flex-1 ml-4">
              <div className="text-xl font-medium">
                {menuItems.find((item) => item.to === location.pathname)?.label || "Dashboard"}
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notificações</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-72 overflow-y-auto">
                    <div className="p-3 hover:bg-muted rounded-md cursor-pointer">
                      <div className="font-medium">Novo lead recebido</div>
                      <div className="text-sm text-muted-foreground">Lead de João Silva adicionado à fila de espera</div>
                      <div className="text-xs text-muted-foreground mt-1">Há 5 minutos</div>
                    </div>
                    <div className="p-3 hover:bg-muted rounded-md cursor-pointer">
                      <div className="font-medium">Chip com baixa performance</div>
                      <div className="text-sm text-muted-foreground">O chip #4 está com taxa de resposta abaixo de 70%</div>
                      <div className="text-xs text-muted-foreground mt-1">Há 2 horas</div>
                    </div>
                    <div className="p-3 hover:bg-muted rounded-md cursor-pointer">
                      <div className="font-medium">Novo relatório disponível</div>
                      <div className="text-sm text-muted-foreground">O relatório semanal de desempenho está disponível</div>
                      <div className="text-xs text-muted-foreground mt-1">Há 1 dia</div>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2 text-center">
                    <Button variant="outline" size="sm" className="w-full">Ver todas</Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Help */}
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>

              {/* Chat */}
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
