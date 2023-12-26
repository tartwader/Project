<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:tei="http://www.tei-c.org/ns/1.0"
    exclude-result-prefixes="xs tei"
    version="2.0">
    
    <!-- <xsl:output method="xml" omit-xml-declaration="yes" indent="yes" /> -->

    
    <xsl:template match="tei:TEI">
                     <div class="row">
                         <div class="col">
                             <h4>About the manuscript page:</h4>
                             <span style = 'font-family: "Perpetua"; font-size: 20px;'>
                             <xsl:value-of select="//tei:sourceDesc"/><br/>
                             <xsl:value-of select="//tei:licence"/>
                             </span><!-- You can change the way the metadata is visualised as well-->
                         </div>
                         <div class="col">
                            <ul id="flowers"><h4>Page Information:</h4>
                                <li><span class="stat">Number of modifications:</span>
                                    <span class="statValue"><xsl:value-of select="count(//tei:del|//tei:add)" /></span> 
                                </li>
                                <li><span class="stat">Number of modifications (by Percy B. S.):</span>
                                    <span class="statValue"><xsl:value-of select="count(//tei:del[@hand='#PBS'] | //tei:add[@hand='#PBS'])" /></span>                                  
                                </li>
                                <li><span class="stat">Number of additions:</span>
                                    <span class="statValue"><xsl:value-of select="count(//tei:add)" /></span>  
                                </li>
                                <li><span class="stat">Number of additions (by Percy B. S.):</span>
                                    <span class="statValue"><xsl:value-of select="count(//tei:add[@hand='#PBS'])" /></span> 
                                </li>
                                <li><span class="stat">Number of deletions:</span>
                                    <span class="statValue"><xsl:value-of select="count(//tei:del)" /></span>
                                </li>
                                <li><span class="stat">Number of deletions (by Percy B. S.):</span> 
                                    <span class="statValue"><xsl:value-of select="count(//tei:del[@hand='#PBS'])" /></span>
                                </li>
                            </ul>
                        </div>
                     </div>
                   <style>
              <![CDATA[
                  body::before {
                  content: "";
                  background-image: url("https://w0.peakpx.com/wallpaper/277/779/HD-wallpaper-sage-green-leaves-trees-branches-sage-green.jpg");
                  opacity: 0.1;
                  position: fixed;
                  width: 100%;
                  height: 100%;
                  z-index: -1; 
                }
              ]]>
        </style>
        <hr/>
    </xsl:template>
    

</xsl:stylesheet>
