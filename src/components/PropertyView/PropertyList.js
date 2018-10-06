import Property from './Property';
import React from 'react';
const PropertyList = function ({ propertyList }) {
    return (
        <div>
            {propertyList.map(property => {
                return <Property key={property.property_id} property={property} />
            })}
        </div>
    )
}

export default PropertyList;

