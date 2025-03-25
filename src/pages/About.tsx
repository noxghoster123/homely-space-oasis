
import { Layout } from "@/components/layout/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-display font-bold text-estate-900 mb-6">About RealEstate</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-estate-700 text-lg mb-6">
              Welcome to RealEstate, where we connect property seekers with their dream homes and investment opportunities. 
              Our platform brings together buyers, sellers, agents, and agencies in one seamless ecosystem.
            </p>
            
            <h2 className="text-2xl font-semibold text-estate-800 mt-8 mb-4">Our Mission</h2>
            <p className="text-estate-700 mb-6">
              To simplify real estate transactions by providing a transparent, efficient platform that 
              serves the needs of all stakeholders in the property market.
            </p>
            
            <h2 className="text-2xl font-semibold text-estate-800 mt-8 mb-4">Our Vision</h2>
            <p className="text-estate-700 mb-6">
              To become the most trusted real estate platform by leveraging technology to create 
              meaningful connections between property seekers and providers.
            </p>
            
            <h2 className="text-2xl font-semibold text-estate-800 mt-8 mb-4">What Sets Us Apart</h2>
            <ul className="space-y-3 text-estate-700 mb-8">
              <li>Comprehensive property listings with detailed information</li>
              <li>Direct communication with agents and agencies</li>
              <li>Verified property information to ensure authenticity</li>
              <li>Powerful search tools to find exactly what you're looking for</li>
              <li>Transparent subscription models for agencies and agents</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-estate-800 mt-8 mb-4">Our Team</h2>
            <p className="text-estate-700 mb-6">
              Behind RealEstate is a team of real estate professionals, technology experts, and customer 
              service specialists dedicated to creating the best possible experience for our users.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
