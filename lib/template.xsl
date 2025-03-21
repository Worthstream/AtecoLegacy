<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match='/'>
		<div id='accordion-sezione'>
		<xsl:for-each select="//sezione">
			<xsl:variable name="codice"></xsl:variable>
			<h2><span class='titleBlock'><span class='codice'><xsl:value-of select="codice"/></span><span class='titoloInside'><xsl:value-of select="titolo"/></span></span>
			<xsl:if test="descrizione[normalize-space()]">
				<i class="fa fa-bars descrizione" title="note"></i><div class='descrizione'><pre><xsl:value-of select="descrizione"/></pre></div>
			</xsl:if>
			</h2>
			<div id='accordion-divisione'>
			<xsl:for-each select=".//divisione">
				<h2><span class='titleBlock'><span class='codice'><xsl:value-of select="codice"/></span><span class='titoloInside'><xsl:value-of select="titolo"/></span></span>
				<xsl:if test="descrizione[normalize-space()]">
					<i class="fa fa-bars descrizione" title="note"></i><div class='descrizione'><pre><xsl:value-of select="descrizione"/></pre></div>
				</xsl:if>
				</h2>
				<div id='accordion-gruppo'>
				<xsl:for-each select=".//gruppo">
					<h2><span class='titleBlock'><span class='codice'><xsl:value-of select="../codice"/>.<xsl:value-of select="codice"/></span><span class='titoloInside'><xsl:value-of select="titolo"/></span></span>
					<xsl:if test="descrizione[normalize-space()]">
						<i class="fa fa-bars descrizione" title="note"></i><div class='descrizione'><pre><xsl:value-of select="descrizione"/></pre></div>
					</xsl:if>
					</h2>
					<div id='accordion-classe'>
					<xsl:for-each select=".//classe">
						<h2><span class='titleBlock'><span class='codice'><xsl:value-of select="../../codice"/>.<xsl:value-of select="../codice"/><xsl:value-of select="codice"/></span><span class='titoloInside'><xsl:value-of select="titolo"/></span></span>
						<xsl:if test="descrizione[normalize-space()]">
							<i class="fa fa-bars descrizione" title="note"></i><div class='descrizione'><pre><xsl:value-of select="descrizione"/></pre></div>
						</xsl:if>
						</h2>
						<div id='accordion-categoria'>
						<xsl:for-each select=".//categoria">
							<h2><span class='titleBlock'><span class='codice'><xsl:value-of select="../../../codice"/>.<xsl:value-of select="../../codice"/><xsl:value-of select="../codice"/>.<xsl:value-of select="codice"/></span><span class='titoloInside'><xsl:value-of select="titolo"/></span></span>
							<xsl:if test="descrizione[normalize-space()]">
								<i class="fa fa-bars descrizione" title="note"></i><div class='descrizione'><pre><xsl:value-of select="descrizione"/></pre></div>
							</xsl:if>
							</h2>
							<div>
							<ul class='last'>
							<xsl:for-each select=".//sottocategoria">
								<li title='Descrizione completa'><span class='codice'><xsl:value-of select="../../../../codice"/>.<xsl:value-of select="../../../codice"/><xsl:value-of select="../../codice"/>.<xsl:value-of select="../codice"/><xsl:value-of select="codice"/></span><span class='titoloInside'><xsl:value-of select="titolo"/></span>
								<xsl:if test="descrizione[normalize-space()]">
								<div class='last'><pre><xsl:value-of select="descrizione"/></pre></div>
								</xsl:if>
								</li>
							</xsl:for-each>
							</ul></div>
						</xsl:for-each>
						</div>
					</xsl:for-each>
					</div>
				</xsl:for-each>
				</div>
			</xsl:for-each>
			</div>
		</xsl:for-each>
		</div>
	</xsl:template>
</xsl:stylesheet>