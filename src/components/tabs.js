import React, { useState } from "react";
import CardList from "./cardlist.js";
import ImageList from "./imagelist.js";
import { useI18next } from 'gatsby-plugin-react-i18next';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import { graphql } from "gatsby";

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: { ns: { in: ["common"] }, language: { eq: $language } }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

const TabComponent = ({ tabs, data }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const { t } = useTranslation();

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
  };

  return (
    
      
      <div className="flex flex-col w-full px-5">
        <div className="flex flex-col lg:flex-row pt-32 justify-between items-baseline w-full">
          <h1 className="text-white text-md lg:text-lg font-extralight font-regular mb-8"><Trans i18nKey={"tabs_members"}>Naši članovi</Trans></h1>
          <div className="flex justify-end space-x-4 border-b border-cyan mb-20">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabClick(tab.key)}
                className={`px-4 py-2 relative ${
                  activeTab === tab.key
                    ? "text-pink1 font-light uppercase underline"
                    : "text-white uppercase"
                }`}
              >
                {tab.label}
              </button>
            ))}
        </div>
        </div>

        {activeTab ===  (
          <>
            <CardList data={data.upravniOdbor} />
            <ImageList data={data.temeljniClanovi} />
          </>
            
        )}
        {activeTab === "upravniOdbor" && <CardList data={data.upravniOdbor} />}
        {activeTab === "temeljniClanovi" && <ImageList data={data.temeljniClanovi} />}      
      
    </div>
  );
};

export default TabComponent;
