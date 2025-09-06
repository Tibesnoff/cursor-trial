import { useResources } from 'src/hooks';
import { RESOURCE_TYPES } from 'src/constants';
import { Card } from 'src/components/ui';

const ResourceDisplay = () => {
    const resources = useResources();

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {RESOURCE_TYPES.map((resource: any) => {
                const value = resources[resource.key as keyof typeof resources];
                return (
                    <Card
                        key={resource.key}
                        variant="glass"
                        padding="md"
                        className={`border-2 ${resource.borderColor} hover:scale-105 transition-transform duration-200`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <span className="text-xl">{resource.emoji}</span>
                                <div>
                                    <div className={`${resource.color} font-bold text-lg font-mono`}>
                                        {value.toLocaleString()}
                                    </div>
                                    <div className="text-xs text-gray-300 font-medium">
                                        {resource.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

export default ResourceDisplay;
