import React from 'react';
export function Logo({small=false}:{small?:boolean}){return <span className={`logo-wrap ${small?'logo-small':''}`}><span className="logo-mark"><span className="logo-core">A</span></span><span className="logo-type"><strong>ASTRA<span>UTILITIES</span></strong><small>BUILD. CREATE. UPGRADE.</small></span></span>}
