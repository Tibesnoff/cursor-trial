import { ResourceDisplay } from 'src/components/common';

const Header = () => {
    return (
        <header className="text-center mb-8">
            <div className="mb-6">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Quantum Clicker
                </h1>
                <p className="text-lg text-gray-300 font-medium">
                    Harvest quantum energy and build your cosmic empire
                </p>
            </div>
            <div className="max-w-4xl mx-auto">
                <ResourceDisplay />
            </div>
        </header>
    );
};

export default Header;
