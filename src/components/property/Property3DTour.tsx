
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { Video3d } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Property3DTourProps {
  tour3dUrl?: string;
}

export function Property3DTour({ tour3dUrl }: Property3DTourProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!tour3dUrl) {
        setHasError(true);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [tour3dUrl]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-estate-100 shadow-subtle">
        <h3 className="text-xl font-display font-semibold text-estate-900 mb-4">3D Virtual Tour</h3>
        <div className="aspect-[16/9] bg-estate-100 rounded-lg flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-estate-700"></div>
            <span className="mt-4 text-estate-500">Loading 3D tour...</span>
          </div>
        </div>
      </div>
    );
  }

  if (hasError || !tour3dUrl) {
    return (
      <div className="bg-white rounded-xl p-6 border border-estate-100 shadow-subtle">
        <h3 className="text-xl font-display font-semibold text-estate-900 mb-4">3D Virtual Tour</h3>
        <div className="aspect-[16/9] bg-estate-100 rounded-lg flex flex-col items-center justify-center p-8">
          <Video3d className="h-12 w-12 text-estate-300 mb-4" />
          <h4 className="text-lg font-medium text-estate-700 mb-2">No 3D Tour Available</h4>
          <p className="text-estate-500 text-center mb-4">This property doesn't have a 3D tour yet.</p>
          <Button variant="outline" className="bg-white">
            Request a Tour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 border border-estate-100 shadow-subtle">
      <h3 className="text-xl font-display font-semibold text-estate-900 mb-4">3D Virtual Tour</h3>
      <div className="aspect-[16/9] bg-estate-100 rounded-lg overflow-hidden">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          {/* Sample 3D model - in a real app, this would load the property model */}
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
          
          {/* Controls for user interaction */}
          <OrbitControls 
            enableZoom={true} 
            enablePan={true} 
            enableRotate={true} 
            autoRotate={true} 
            autoRotateSpeed={0.5} 
          />
          
          <Environment preset="sunset" />
        </Canvas>
        
        <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-md text-white text-xs">
          Click and drag to look around
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-estate-500">
            Explore this property in 3D. Click and drag to rotate, scroll to zoom.
          </p>
        </div>
        <Button size="sm" variant="outline">
          Fullscreen
        </Button>
      </div>
    </div>
  );
}
