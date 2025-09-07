import React from 'react';

interface PageHeaderProps {
    title: string;
    description: string;
    emoji?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, description, emoji }) => {
    return (
        <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-white mb-2">
                {emoji && <span className="mr-2">{emoji}</span>}
                {title}
            </h2>
            <p className="text-gray-300">{description}</p>
        </div>
    );
};

export default PageHeader;
