import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import type { FlashMessages } from '@/types/farm';

export default function FlashMessage() {
    const { flash } = usePage().props as unknown as { flash: FlashMessages };
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => clearTimeout(timer);
    }, [flash]);

    if (!visible || !flash) {
        return null;
    }

    const handleClose = () => {
        setVisible(false);
    };

    const messages = [
        { type: 'success', icon: CheckCircle, className: 'bg-green-50 border-green-200 text-green-800' },
        { type: 'error', icon: AlertCircle, className: 'bg-red-50 border-red-200 text-red-800' },
        { type: 'info', icon: Info, className: 'bg-blue-50 border-blue-200 text-blue-800' },
        { type: 'warning', icon: AlertTriangle, className: 'bg-yellow-50 border-yellow-200 text-yellow-800' },
    ];

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {messages.map(({ type, icon: Icon, className }) => {
                const message = flash[type as keyof FlashMessages];
                if (!message) return null;

                return (
                    <div
                        key={type}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg ${className}`}
                    >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span className="flex-1">{message}</span>
                        <button
                            onClick={handleClose}
                            className="flex-shrink-0 hover:opacity-70 transition-opacity"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}
