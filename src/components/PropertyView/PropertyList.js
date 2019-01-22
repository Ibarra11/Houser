import Property from './Property';
import React from 'react';
const PropertyList = function ({ propertyList, deleteProperty, editProperty, propertyEditId }) {
    return (
        <div>
            {propertyList.map(property => {
                    return <Property editProperty={editProperty} propertyBeingEdited={property.property_id === propertyEditId} deleteProperty={deleteProperty} key={property.property_id} property={property} />
                
            })}
        </div>
    )
}

export default PropertyList;

