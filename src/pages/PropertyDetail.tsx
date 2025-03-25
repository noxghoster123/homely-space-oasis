
import { Layout } from "@/components/layout/Layout";
import { useParams } from "react-router-dom";
import { PropertyBreadcrumb } from "@/components/property/PropertyBreadcrumb";
import { PropertyHeader } from "@/components/property/PropertyHeader";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { PropertySidebar } from "@/components/property/PropertySidebar";
import { PropertyTabs } from "@/components/property/PropertyTabs";
import { property, amenityIcons } from "@/components/property/PropertyData";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real application, you would fetch the property data based on the ID
  // For now, we're using the static property data

  return (
    <Layout>
      {/* Breadcrumb Navigation */}
      <PropertyBreadcrumb title={property.title} />
      
      {/* Property Header */}
      <PropertyHeader property={property} />
      
      {/* Property Images and Sidebar */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <PropertyGallery images={property.images} title={property.title} />
            <PropertySidebar property={property} />
          </div>
        </div>
      </section>
      
      {/* Property Details Tabs */}
      <PropertyTabs property={property} amenityIcons={amenityIcons} />
    </Layout>
  );
};

export default PropertyDetail;
