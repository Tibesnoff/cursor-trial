import { ResourceDisplay } from 'src/components/common';

const Header = () => {
    return (
        <header className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                Quantum Clicker
            </h1>
            <p className="text-xl text-blue-200 mb-4">
                Harvest quantum energy and build your cosmic empire
            </p>
            <ResourceDisplay />
        </header>
    );
};

export default Header;
