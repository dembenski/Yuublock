import * as hz from 'horizon/core';

class CubeSpawner extends hz.Component<CubeSpawner> {
    // Link your building block cube asset/prefab in the property inspector
    public cubeAsset = this.defineAssetProperty({
        label: "Cube Building Block",
        defaultValue: "",
    });

    start() {
        // Example: Listen for a click or interaction on this entity
        this.entity.as(hz.Interactable)?.onInteract.subscribe((player) => {
            this.spawnCube(player);
        });
    }

    private spawnCube(player: hz.Player) {
        if (!this.cubeAsset) {
            console.warn("Missing cube asset reference!");
            return;
        }

        // Calculate spawn position slightly in front of the player
        const playerPos = player.position;
        const playerForward = player.forwardVector;
        const spawnPos = new hz.Vec3(
            playerPos.x + playerForward.x * 2,
            playerPos.y,
            playerPos.z + playerForward.z * 2
        );

        // Spawn the cube into the world session
        hz.SpawnManager.spawnAsset(
            this.cubeAsset, 
            spawnPos, 
            hz.Quaternion.identity
        );
    }
}

hz.Component.register(CubeSpawner);