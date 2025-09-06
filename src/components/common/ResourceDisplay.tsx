import { useResources } from 'src/hooks';
import { RESOURCE_TYPES } from 'src/constants';
import { Card } from 'src/components/ui';

const ResourceDisplay = () => {
    const resources = useResources();

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {RESOURCE_TYPES.map((resource: any) => {
                const value = resources[resource.key as keyof typeof resources];
                return (
                    <Card
                        key={resource.key}
                        variant="glass"
                        padding="sm"
                        className={`border ${resource.borderColor}`}
                    >
                        <div className={`${resource.color} font-mono text-lg`}>
                            {resource.emoji} {value.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-400">{resource.name}</div>
                    </Card>
                );
            })}
        </div>
    );
};

export default ResourceDisplay;
