class QuantumPhysics {
    constructor() {
        this.universes = new Map();
        this.quantumStates = new Map();
        this.entangledPairs = new Set();
        this.superpositions = new Map();
        this.waveFunction = this.createWaveFunction();
        this.coherenceLevel = 100;
        this.quantumEnergy = 1000;
        this.observationHistory = [];
        this.timeReversal = [];
    }
    
    createWaveFunction() {
        return {
            amplitude: 1.0,
            phase: 0,
            probability: 1.0,
            collapsed: false
        };
    }
    
    // Quantum Superposition: Pieces exist in multiple states simultaneously
    createSuperposition(pieceId, states) {
        const superposition = {
            id: pieceId,
            states: states.map(state => ({
                ...state,
                probability: 1 / states.length,
                amplitude: Math.sqrt(1 / states.length)
            })),
            observed: false,
            entangled: false
        };
        
        this.superpositions.set(pieceId, superposition);
        return superposition;
    }
    
    // Wave Function Collapse: When observed, superposition collapses to single state
    collapseWaveFunction(pieceId) {
        const superposition = this.superpositions.get(pieceId);
        if (!superposition || superposition.observed) return null;
        
        // Calculate probabilities based on quantum amplitudes
        const totalProbability = superposition.states.reduce((sum, state) => 
            sum + Math.pow(state.amplitude, 2), 0);
        
        let random = Math.random() * totalProbability;
        let selectedState = null;
        
        for (const state of superposition.states) {
            random -= Math.pow(state.amplitude, 2);
            if (random <= 0) {
                selectedState = state;
                break;
            }
        }
        
        superposition.observed = true;
        superposition.collapsedState = selectedState;
        
        // Affect coherence
        this.coherenceLevel = Math.max(0, this.coherenceLevel - 5);
        
        // Record observation
        this.observationHistory.push({
            pieceId,
            timestamp: Date.now(),
            selectedState,
            previousStates: superposition.states.length
        });
        
        return selectedState;
    }
    
    // Quantum Entanglement: Link pieces across universes
    entanglePieces(piece1Id, piece2Id, universeId1, universeId2) {
        const entanglement = {
            piece1: { id: piece1Id, universe: universeId1 },
            piece2: { id: piece2Id, universe: universeId2 },
            entanglementStrength: 1.0,
            correlationType: 'position', // position, rotation, color
            created: Date.now()
        };
        
        this.entangledPairs.add(entanglement);
        this.quantumEnergy -= 100; // Entanglement costs energy
        
        return entanglement;
    }
    
    // Apply entanglement effects
    applyEntanglement(piece1Change, piece1Id) {
        for (const entanglement of this.entangledPairs) {
            if (entanglement.piece1.id === piece1Id) {
                return this.calculateEntangledEffect(piece1Change, entanglement);
            } else if (entanglement.piece2.id === piece1Id) {
                return this.calculateEntangledEffect(piece1Change, entanglement, true);
            }
        }
        return null;
    }
    
    calculateEntangledEffect(change, entanglement, isSecondPiece = false) {
        const strength = entanglement.entanglementStrength;
        
        switch (entanglement.correlationType) {
            case 'position':
                return {
                    targetPiece: isSecondPiece ? entanglement.piece1 : entanglement.piece2,
                    effect: {
                        dx: -change.dx * strength, // Opposite movement
                        dy: change.dy * strength   // Same vertical movement
                    }
                };
            case 'rotation':
                return {
                    targetPiece: isSecondPiece ? entanglement.piece1 : entanglement.piece2,
                    effect: {
                        rotation: -change.rotation * strength
                    }
                };
            case 'color':
                return {
                    targetPiece: isSecondPiece ? entanglement.piece1 : entanglement.piece2,
                    effect: {
                        colorShift: change.colorShift * strength
                    }
                };
        }
    }
    
    // Quantum Tunneling: Pieces can phase through solid matter
    quantumTunnel(piece, obstacles, tunnelProbability = 0.3) {
        if (this.quantumEnergy < 50) return false;
        
        const tunnelingSuccess = Math.random() < tunnelProbability;
        
        if (tunnelingSuccess) {
            this.quantumEnergy -= 50;
            
            // Create tunneling effect
            return {
                success: true,
                newPosition: this.calculateTunnelDestination(piece, obstacles),
                particleEffect: this.createTunnelParticles(piece.position)
            };
        }
        
        return { success: false };
    }
    
    calculateTunnelDestination(piece, obstacles) {
        // Find closest safe position beyond obstacles
        const directions = [
            { dx: 0, dy: 1 },  // Down
            { dx: -1, dy: 0 }, // Left
            { dx: 1, dy: 0 },  // Right
            { dx: 0, dy: -1 }  // Up
        ];
        
        for (const dir of directions) {
            let steps = 1;
            while (steps <= 5) { // Max tunnel distance
                const newPos = {
                    x: piece.position.x + dir.dx * steps,
                    y: piece.position.y + dir.dy * steps
                };
                
                if (this.isPositionSafe(newPos, obstacles)) {
                    return newPos;
                }
                steps++;
            }
        }
        
        return piece.position; // No safe destination found
    }
    
    isPositionSafe(position, obstacles) {
        return !obstacles.some(obstacle => 
            obstacle.x === position.x && obstacle.y === position.y);
    }
    
    createTunnelParticles(position) {
        const particles = [];
        for (let i = 0; i < 20; i++) {
            particles.push({
                x: position.x,
                y: position.y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1.0,
                decay: 0.02,
                color: '#00ffff',
                type: 'tunnel'
            });
        }
        return particles;
    }
    
    // Time Reversal: Undo recent quantum states
    reverseTime(steps = 3) {
        if (this.quantumEnergy < 200 || this.timeReversal.length === 0) return null;
        
        this.quantumEnergy -= 200;
        const reversalSteps = Math.min(steps, this.timeReversal.length);
        const reversedStates = [];
        
        for (let i = 0; i < reversalSteps; i++) {
            const state = this.timeReversal.pop();
            if (state) {
                reversedStates.push(state);
            }
        }
        
        return reversedStates;
    }
    
    // Save state for time reversal
    saveTimeState(gameState) {
        this.timeReversal.push({
            timestamp: Date.now(),
            gameState: JSON.parse(JSON.stringify(gameState)),
            quantumState: {
                superpositions: new Map(this.superpositions),
                entanglements: new Set(this.entangledPairs),
                coherence: this.coherenceLevel,
                energy: this.quantumEnergy
            }
        });
        
        // Keep only last 10 states
        if (this.timeReversal.length > 10) {
            this.timeReversal.shift();
        }
    }
    
    // Spacetime Distortion: Modify board geometry
    createSpacetimeDistortion(center, intensity, type = 'gravity') {
        return {
            center,
            intensity,
            type,
            radius: intensity * 3,
            effects: this.calculateDistortionEffects(center, intensity, type),
            duration: 5000, // 5 seconds
            created: Date.now()
        };
    }
    
    calculateDistortionEffects(center, intensity, type) {
        const effects = [];
        const radius = intensity * 3;
        
        for (let x = center.x - radius; x <= center.x + radius; x++) {
            for (let y = center.y - radius; y <= center.y + radius; y++) {
                const distance = Math.sqrt(
                    Math.pow(x - center.x, 2) + Math.pow(y - center.y, 2)
                );
                
                if (distance <= radius) {
                    const effect = this.calculateDistortionForPoint(
                        { x, y }, center, distance, intensity, type
                    );
                    if (effect) effects.push(effect);
                }
            }
        }
        
        return effects;
    }
    
    calculateDistortionForPoint(point, center, distance, intensity, type) {
        const normalizedDistance = distance / (intensity * 3);
        const strength = (1 - normalizedDistance) * intensity;
        
        switch (type) {
            case 'gravity':
                return {
                    position: point,
                    gravityMultiplier: 1 + strength * 2,
                    visualWarp: strength * 0.1
                };
            case 'time':
                return {
                    position: point,
                    timeMultiplier: 1 - strength * 0.5,
                    visualSlow: strength * 0.2
                };
            case 'space':
                return {
                    position: point,
                    spaceWarp: {
                        dx: (point.x - center.x) * strength * 0.1,
                        dy: (point.y - center.y) * strength * 0.1
                    }
                };
        }
    }
    
    // Parallel Universe Management
    createParallelUniverse(sourceUniverseId, divergencePoint) {
        const newUniverseId = `universe_${Date.now()}`;
        const sourceUniverse = this.universes.get(sourceUniverseId);
        
        if (!sourceUniverse) return null;
        
        // Create branched universe from divergence point
        const newUniverse = {
            id: newUniverseId,
            parentId: sourceUniverseId,
            divergencePoint,
            probability: 0.5, // Start with 50% probability
            gameState: JSON.parse(JSON.stringify(sourceUniverse.gameState)),
            quantumEvents: [],
            created: Date.now()
        };
        
        // Adjust probabilities
        sourceUniverse.probability *= 0.5;
        
        this.universes.set(newUniverseId, newUniverse);
        return newUniverse;
    }
    
    // Calculate universe probability based on quantum events
    updateUniverseProbabilities() {
        const totalObservations = this.observationHistory.length;
        if (totalObservations === 0) return;
        
        for (const [universeId, universe] of this.universes) {
            // More observations increase probability
            const recentObservations = this.observationHistory
                .filter(obs => Date.now() - obs.timestamp < 30000) // Last 30 seconds
                .length;
            
            const probabilityBoost = recentObservations / totalObservations;
            universe.probability = Math.min(1.0, universe.probability + probabilityBoost * 0.1);
        }
        
        // Normalize probabilities
        const totalProbability = Array.from(this.universes.values())
            .reduce((sum, universe) => sum + universe.probability, 0);
        
        if (totalProbability > 1) {
            for (const universe of this.universes.values()) {
                universe.probability /= totalProbability;
            }
        }
    }
    
    // Quantum energy regeneration
    regenerateQuantumEnergy(deltaTime) {
        const regenRate = 10; // Energy per second
        const maxEnergy = 1000;
        
        this.quantumEnergy = Math.min(maxEnergy, 
            this.quantumEnergy + (regenRate * deltaTime / 1000));
        
        // Coherence slowly recovers
        if (this.coherenceLevel < 100) {
            this.coherenceLevel = Math.min(100, 
                this.coherenceLevel + (deltaTime / 10000)); // Very slow recovery
        }
    }
    
    // Get current quantum state for display
    getQuantumState() {
        return {
            superpositionCount: this.superpositions.size,
            entangledCount: this.entangledPairs.size,
            coherence: Math.round(this.coherenceLevel),
            quantumEnergy: Math.round(this.quantumEnergy),
            observationHistory: this.observationHistory.length,
            universeCount: this.universes.size
        };
    }
}