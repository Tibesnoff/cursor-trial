import React, { useState } from 'react';
import { useGameState, useGameActions } from 'src/hooks';
import {
    saveToLocalStorage,
    loadFromLocalStorage,
    exportSaveData,
    importSaveData,
    clearSaveData,
    hasSaveData,
} from 'src/utils/saveManager';

const SaveManager: React.FC = () => {
    const gameState = useGameState();
    const actions = useGameActions();
    const [importText, setImportText] = useState('');
    const [showImport, setShowImport] = useState(false);
    const [message, setMessage] = useState('');

    const showMessage = (text: string) => {
        setMessage(text);
        setTimeout(() => setMessage(''), 3000);
    };

    const handleSave = () => {
        const success = saveToLocalStorage(gameState);
        showMessage(success ? 'Game saved successfully!' : 'Failed to save game');
    };

    const handleLoad = () => {
        const loadedState = loadFromLocalStorage();
        if (loadedState) {
            actions.loadGameState(loadedState);
            showMessage('Game loaded successfully!');
        } else {
            showMessage('No save data found');
        }
    };

    const handleExport = () => {
        const saveString = exportSaveData(gameState);
        navigator.clipboard.writeText(saveString).then(() => {
            showMessage('Save data copied to clipboard!');
        }).catch(() => {
            showMessage('Failed to copy to clipboard');
        });
    };

    const handleImport = () => {
        if (!importText.trim()) {
            showMessage('Please enter save data');
            return;
        }

        const loadedState = importSaveData(importText.trim());
        if (loadedState) {
            actions.loadGameState(loadedState);
            setImportText('');
            setShowImport(false);
            showMessage('Save data imported successfully!');
        } else {
            showMessage('Invalid save data');
        }
    };

    const handleClear = () => {
        if (window.confirm('Are you sure you want to clear all save data? This cannot be undone.')) {
            clearSaveData();
            showMessage('Save data cleared');
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
            <h3 className="text-lg font-bold text-white mb-4">💾 Save Manager</h3>

            {message && (
                <div className={`mb-4 p-2 rounded text-sm ${message.includes('Failed') || message.includes('Invalid') || message.includes('No save')
                        ? 'bg-red-900 text-red-200'
                        : 'bg-green-900 text-green-200'
                    }`}>
                    {message}
                </div>
            )}

            <div className="space-y-3">
                {/* Auto Save Controls */}
                <div className="flex space-x-2">
                    <button
                        onClick={handleSave}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                    >
                        💾 Save Game
                    </button>
                    <button
                        onClick={handleLoad}
                        disabled={!hasSaveData()}
                        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                    >
                        📁 Load Game
                    </button>
                </div>

                {/* Export/Import Controls */}
                <div className="flex space-x-2">
                    <button
                        onClick={handleExport}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                    >
                        📤 Export Save
                    </button>
                    <button
                        onClick={() => setShowImport(!showImport)}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                    >
                        📥 Import Save
                    </button>
                </div>

                {/* Import Text Area */}
                {showImport && (
                    <div className="space-y-2">
                        <textarea
                            value={importText}
                            onChange={(e) => setImportText(e.target.value)}
                            placeholder="Paste your save data here..."
                            className="w-full h-24 bg-gray-700 text-white p-2 rounded border border-gray-600 text-xs font-mono resize-none"
                        />
                        <div className="flex space-x-2">
                            <button
                                onClick={handleImport}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                            >
                                Import
                            </button>
                            <button
                                onClick={() => {
                                    setShowImport(false);
                                    setImportText('');
                                }}
                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Clear Save Data */}
                <button
                    onClick={handleClear}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-medium transition-colors"
                >
                    🗑️ Clear Save Data
                </button>
            </div>

            {/* Save Data Info */}
            <div className="mt-4 pt-3 border-t border-gray-600">
                <p className="text-xs text-gray-400">
                    Auto-save: {hasSaveData() ? '✅ Available' : '❌ No save data'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    Save data is encrypted and stored locally in your browser.
                </p>
            </div>
        </div>
    );
};

export default SaveManager;
