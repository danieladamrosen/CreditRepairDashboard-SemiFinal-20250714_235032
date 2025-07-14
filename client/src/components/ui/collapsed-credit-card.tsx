import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { ThickCheckIcon } from "@/components/ui/thick-check-icon";
import { cn } from "@/lib/utils";
import React from "react";

export interface CollapsedCreditCardProps {
  /** Total number of credit accounts */
  totalCount: number;
  /** Number of negative / unsaved accounts */
  warningCount: number;
  /** Whether the section is collapsed */
  collapsed: boolean;
  /** Whether all accounts are saved */
  savedState: boolean;
  /** Handler for toggling */
  onToggle: () => void;
  /** Handler for expansion (optional) */
  onExpand?: () => void;
  /** Children shown in expanded state */
  children?: React.ReactNode;
}

const CollapsedCreditCard: React.FC<CollapsedCreditCardProps> = ({
  totalCount,
  warningCount,
  collapsed,
  savedState,
  onToggle,
  onExpand,
  children,
}) => {
  const hasWarning = warningCount > 0;

  const subtitle = savedState
    ? `You've saved disputes for ${totalCount} credit account(s) across TransUnion, Equifax, and Experian`
    : collapsed && hasWarning
    ? `${warningCount} negative accounts need dispute review`
    : `${totalCount} credit accounts in good standing`;

  const cardClasses = cn(
    "transition-all duration-300 rounded-lg overflow-hidden",
    // Green styling when collapsed AND saved
    collapsed && savedState
      ? "border-[2px] border-green-500 bg-green-50 hover:shadow-lg cursor-pointer"
      : // Red styling when collapsed AND has warnings
      collapsed && hasWarning
      ? "border-[2px] border-red-500 bg-red-50 hover:shadow-lg cursor-pointer"
      : // Default styling when collapsed
        collapsed
      ? "border-[2px] border-gray-200 bg-white hover:shadow-lg cursor-pointer"
      : // Expanded state gets no styling (applied by wrapper)
        ""
  );

  return (
    <Card className={cardClasses} data-testid="credit-accounts-card" data-collapsed={collapsed}>
      {/* HEADER (always visible) */}
      <CardHeader
        className={cn(
          "cursor-pointer transition-colors duration-200 flex items-center p-6",
          collapsed && savedState ? "bg-green-50 hover:bg-green-100" : 
          collapsed && hasWarning ? "bg-red-50 hover:bg-red-100" : "bg-white hover:bg-gray-50"
        )}
        onClick={() => {
          console.log("Credit Accounts header clicked — scrolling to credit-accounts");
          
          // Smooth scroll to Credit Accounts section
          const creditAccountsSection = document.querySelector('[data-section="credit-accounts"]') as HTMLElement;
          if (creditAccountsSection) {
            const elementTop = creditAccountsSection.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementTop - 20;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
          
          onToggle();
        }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold",
                collapsed && savedState ? "bg-green-600" : 
                collapsed && hasWarning ? "bg-red-600" : "bg-gray-500"
              )}>
                {collapsed && savedState ? <ThickCheckIcon className="w-4 h-4" /> : totalCount}
              </div>
            </div>
            <div>
              <h3 className={cn(
                "text-lg font-bold",
                collapsed && savedState ? "text-green-700" :
                collapsed && hasWarning ? "text-red-700" : "text-gray-700"
              )}>
                Credit Accounts
              </h3>
              <p className={cn(
                "text-sm flex items-center gap-1",
                collapsed && savedState ? "text-green-700" :
                collapsed && hasWarning ? "text-red-700" : "text-gray-600"
              )}>
                {collapsed && hasWarning && <AlertTriangle className="w-4 h-4" />}
                {subtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className={cn(
              "text-sm",
              collapsed && savedState ? "text-green-700" :
              collapsed && hasWarning ? "text-red-600" : "text-gray-600"
            )}>
              {totalCount} {totalCount === 1 ? "account" : "accounts"}
            </span>
            {/* Chevron with proper color states */}
            {collapsed ? (
              <ChevronDown className={cn(
                "w-4 h-4",
                collapsed && savedState ? "text-green-700" :
                collapsed && hasWarning ? "text-red-600" : "text-gray-600"
              )} />
            ) : (
              <ChevronUp className={cn(
                "w-4 h-4",
                collapsed && savedState ? "text-green-700" :
                collapsed && hasWarning ? "text-red-600" : "text-gray-600"
              )} />
            )}
          </div>
        </div>
      </CardHeader>

      {/* BODY (only when not collapsed) */}
      {!collapsed && children && (
        <CardContent className="pt-0 pb-4 px-4">{children}</CardContent>
      )}
    </Card>
  );
};

export default CollapsedCreditCard;