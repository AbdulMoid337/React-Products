import React, { useEffect } from 'react';

const GoogleAd = () => {
  useEffect(() => {
    // Initialize Google Ads
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <div>
      <ins className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-1129923107994468"  
           data-ad-slot="YOUR-AD-SLOT-ID"  
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </div>
  );
};

export default GoogleAd;
