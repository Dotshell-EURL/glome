import React, { useState, useEffect, useRef } from 'react';
import noProfile from '/no-profile.svg';
import UserMenuItem from './user_menu/UserMenuItem';
import { useTranslation } from 'react-i18next';
import UserMenuItemsGroup from './user_menu/UserMenuItemsGroup';

const UserMenu: React.FC = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative ml-3" ref={menuRef}>
            <button
                type="button"
                className="relative flex max-w-xs items-center rounded-full bg-gray-100 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-200"
                id="user-menu-button"
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={handleButtonClick}
            >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <img className="size-8 rounded-full shadow-md" src={noProfile} alt="" />
            </button>
            {isOpen && (
                <UserMenuItemsGroup />
            )}
        </div>
    );
};

export default UserMenu;