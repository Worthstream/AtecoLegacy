<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match='/'>
		<div id='accordion-sezione'>
		<xsl:for-each select="//Sezione">
			<xsl:variable name="codice"></xsl:variable>
			<h2><span class='titleBlock'><span class='codice'><xsl:value-of select="Codice"/></span><span class='titoloInside'><xsl:value-of select="Titolo"/></span></span>
			<xsl:if test="Descrizione[normalize-space()]">
				<i class="fa fa-bars descrizione" title="note"></i><div class='descrizione'>
					<xsl:choose>
						<xsl:when test="Descrizione/INDEX">
							<div class='last'><pre>
								<xsl:for-each select="Descrizione/*[not(name()='ESCLUSIONE') and not(name()='INCLUSIONE') and not(name()='INCLUSIONEAGGIUNTIVA')]">
									<xsl:apply-templates select="." mode="process-description"/>
									<xsl:if test="position() != last()">
										<br/>
									</xsl:if>
								</xsl:for-each>
							</pre></div>
							<xsl:for-each select="Descrizione/ESCLUSIONE">
								<div class='last'>Sono escluse le seguenti attività: <br/><pre><xsl:value-of select="."/></pre></div>
							</xsl:for-each>
						</xsl:when>
						<xsl:otherwise>
							<xsl:choose>
								<xsl:when test="Descrizione/*">
									<div class='last'><pre>
										<xsl:for-each select="Descrizione/*[not(name()='ESCLUSIONE')]">
											<xsl:apply-templates select="." mode="process-description"/>
											<xsl:if test="position() != last()">
												<br/>
											</xsl:if>
										</xsl:for-each>
									</pre></div>
									<xsl:for-each select="Descrizione/ESCLUSIONE">
										<div class='last'>Sono escluse le seguenti attività: <br/><pre><xsl:value-of select="."/></pre></div>
									</xsl:for-each>
								</xsl:when>
								<xsl:otherwise>
									<div class='last'><pre><xsl:value-of select="Descrizione"/></pre></div>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:otherwise>
					</xsl:choose>
				</div>
			</xsl:if>
			</h2>
			<div id='accordion-divisione'>
			<xsl:for-each select=".//Divisione">
				<h2><span class='titleBlock'><span class='codice'><xsl:value-of select="Codice"/></span><span class='titoloInside'><xsl:value-of select="Titolo"/></span></span>
				<xsl:if test="Descrizione[normalize-space()]">
					<i class="fa fa-bars descrizione" title="note"></i><div class='descrizione'>
						<xsl:choose>
							<xsl:when test="Descrizione/INDEX">
								<div class='last'><pre>
									<xsl:for-each select="Descrizione/*[not(name()='ESCLUSIONE') and not(name()='INCLUSIONE') and not(name()='INCLUSIONEAGGIUNTIVA')]">
										<xsl:apply-templates select="." mode="process-description"/>
										<xsl:if test="position() != last()">
											<br/>
										</xsl:if>
									</xsl:for-each>
								</pre></div>
								<xsl:for-each select="Descrizione/ESCLUSIONE">
									<div class='last'>Sono escluse le seguenti attività: <br/><pre><xsl:value-of select="."/></pre></div>
								</xsl:for-each>
							</xsl:when>
							<xsl:otherwise>
								<xsl:choose>
									<xsl:when test="Descrizione/*">
										<div class='last'><pre>
											<xsl:for-each select="Descrizione/*[not(name()='ESCLUSIONE')]">
												<xsl:apply-templates select="." mode="process-description"/>
												<xsl:if test="position() != last()">
													<br/>
												</xsl:if>
											</xsl:for-each>
										</pre></div>
										<xsl:for-each select="Descrizione/ESCLUSIONE">
											<div class='last'>Sono escluse le seguenti attività: <br/><pre><xsl:value-of select="."/></pre></div>
										</xsl:for-each>
									</xsl:when>
									<xsl:otherwise>
										<div class='last'><pre><xsl:value-of select="Descrizione"/></pre></div>
									</xsl:otherwise>
								</xsl:choose>
							</xsl:otherwise>
						</xsl:choose>
					</div>
				</xsl:if>
				</h2>
				<div id='accordion-gruppo'>
				<xsl:for-each select=".//Gruppo">
					<h2><span class='titleBlock'><span class='codice'><xsl:value-of select="../Codice"/>.<xsl:value-of select="Codice"/></span><span class='titoloInside'><xsl:value-of select="Titolo"/></span></span>
					<xsl:if test="Descrizione[normalize-space()]">
						<i class="fa fa-bars descrizione" title="note"></i><div class='descrizione'>
							<xsl:choose>
								<xsl:when test="Descrizione/INDEX">
									<div class='last'><pre>
										<xsl:for-each select="Descrizione/*[not(name()='ESCLUSIONE') and not(name()='INCLUSIONE') and not(name()='INCLUSIONEAGGIUNTIVA')]">
											<xsl:apply-templates select="." mode="process-description"/>
											<xsl:if test="position() != last()">
												<br/>
											</xsl:if>
										</xsl:for-each>
									</pre></div>
									<xsl:for-each select="Descrizione/ESCLUSIONE">
										<div class='last'>Sono escluse le seguenti attività: <br/><pre><xsl:value-of select="."/></pre></div>
									</xsl:for-each>
								</xsl:when>
								<xsl:otherwise>
									<xsl:choose>
										<xsl:when test="Descrizione/*">
											<div class='last'><pre>
												<xsl:for-each select="Descrizione/*[not(name()='ESCLUSIONE')]">
													<xsl:apply-templates select="." mode="process-description"/>
													<xsl:if test="position() != last()">
														<br/>
													</xsl:if>
												</xsl:for-each>
										</pre></div>
											<xsl:for-each select="Descrizione/ESCLUSIONE">
												<div class='last'>Sono escluse le seguenti attività: <br/><pre><xsl:value-of select="."/></pre></div>
											</xsl:for-each>
										</xsl:when>
										<xsl:otherwise>
											<div class='last'><pre><xsl:value-of select="Descrizione"/></pre></div>
										</xsl:otherwise>
									</xsl:choose>
								</xsl:otherwise>
							</xsl:choose>
						</div>
					</xsl:if>
					</h2>
					<div id='accordion-classe'>
					<xsl:for-each select=".//Classe">
						<h2><span class='titleBlock'><span class='codice'><xsl:value-of select="../../Codice"/>.<xsl:value-of select="../Codice"/><xsl:value-of select="Codice"/></span><span class='titoloInside'><xsl:value-of select="Titolo"/></span></span>
						<xsl:if test="Descrizione[normalize-space()]">
							<i class="fa fa-bars descrizione" title="note"></i><div class='descrizione'>
								<xsl:choose>
									<xsl:when test="Descrizione/INDEX">
										<div class='last'><pre>
											<xsl:for-each select="Descrizione/*[not(name()='ESCLUSIONE') and not(name()='INCLUSIONE') and not(name()='INCLUSIONEAGGIUNTIVA')]">
												<xsl:apply-templates select="." mode="process-description"/>
												<xsl:if test="position() != last()">
													<br/>
												</xsl:if>
											</xsl:for-each>
										</pre></div>
										<xsl:for-each select="Descrizione/ESCLUSIONE">
											<div class='last'>Sono escluse le seguenti attività: <br/><pre><xsl:value-of select="."/></pre></div>
										</xsl:for-each>
									</xsl:when>
									<xsl:otherwise>
										<xsl:choose>
											<xsl:when test="Descrizione/*">
												<div class='last'><pre>
													<xsl:for-each select="Descrizione/*[not(name()='ESCLUSIONE')]">
														<xsl:apply-templates select="." mode="process-description"/>
														<xsl:if test="position() != last()">
															<br/>
														</xsl:if>
													</xsl:for-each>
												</pre></div>
												<xsl:for-each select="Descrizione/ESCLUSIONE">
													<div class='last'>Sono escluse le seguenti attività: <br/><pre><xsl:value-of select="."/></pre></div>
												</xsl:for-each>
											</xsl:when>
											<xsl:otherwise>
												<div class='last'><pre><xsl:value-of select="Descrizione"/></pre></div>
											</xsl:otherwise>
										</xsl:choose>
									</xsl:otherwise>
								</xsl:choose>
							</div>
						</xsl:if>
						</h2>
						<div id='accordion-categoria'>
						<xsl:for-each select=".//Categoria">
							<h2><span class='titleBlock'><span class='codice'><xsl:value-of select="../../../Codice"/>.<xsl:value-of select="../../Codice"/><xsl:value-of select="../Codice"/>.<xsl:value-of select="Codice"/></span><span class='titoloInside'><xsl:value-of select="Titolo"/></span></span>
							<xsl:if test="Descrizione[normalize-space()]">
								<i class="fa fa-bars descrizione" title="note"></i><div class='descrizione'>
									<xsl:choose>
										<xsl:when test="Descrizione/INDEX">
											<div class='last'><pre>
												<xsl:for-each select="Descrizione/*[not(name()='ESCLUSIONE') and not(name()='INCLUSIONE') and not(name()='INCLUSIONEAGGIUNTIVA')]">
													<xsl:apply-templates select="." mode="process-description"/>
													<xsl:if test="position() != last()">
														<br/>
													</xsl:if>
												</xsl:for-each>
											</pre></div>
											<xsl:for-each select="Descrizione/ESCLUSIONE">
												<div class='last'>Sono escluse le seguenti attività: <br/><pre><xsl:value-of select="."/></pre></div>
											</xsl:for-each>
										</xsl:when>
										<xsl:otherwise>
											<xsl:choose>
												<xsl:when test="Descrizione/*">
													<div class='last'><pre>
														<xsl:for-each select="Descrizione/*[not(name()='ESCLUSIONE')]">
															<xsl:apply-templates select="." mode="process-description"/>
															<xsl:if test="position() != last()">
																<br/>
															</xsl:if>
														</xsl:for-each>
													</pre></div>
													<xsl:for-each select="Descrizione/ESCLUSIONE">
														<div class='last'>Sono escluse le seguenti attività: <br/><pre><xsl:value-of select="."/></pre></div>
													</xsl:for-each>
												</xsl:when>
												<xsl:otherwise>
													<div class='last'><pre><xsl:value-of select="Descrizione"/></pre></div>
												</xsl:otherwise>
											</xsl:choose>
										</xsl:otherwise>
									</xsl:choose>
								</div>
							</xsl:if>
							</h2>
							<div>
							<ul class='last'>
							<xsl:for-each select=".//Sottocategoria">
								<li title='Descrizione completa'><span class='codice'><xsl:value-of select="../../../../Codice"/>.<xsl:value-of select="../../../Codice"/><xsl:value-of select="../../Codice"/>.<xsl:value-of select="../Codice"/><xsl:value-of select="Codice"/></span><span class='titoloInside'><xsl:value-of select="Titolo"/></span>
								<xsl:if test="Descrizione[normalize-space()]">
									<xsl:choose>
										<xsl:when test="Descrizione/INDEX">
											<div class='last'><pre>
												<xsl:for-each select="Descrizione/*[not(name()='ESCLUSIONE') and not(name()='INCLUSIONE') and not(name()='INCLUSIONEAGGIUNTIVA')]">
													<xsl:apply-templates select="." mode="process-description"/>
													<xsl:if test="position() != last()">
														<br/>
													</xsl:if>
												</xsl:for-each>
											</pre></div>
											<xsl:for-each select="Descrizione/ESCLUSIONE">
												<div class='last'>Sono escluse le seguenti attività: <br/><pre><xsl:value-of select="."/></pre></div>
											</xsl:for-each>
										</xsl:when>
										<xsl:otherwise>
											<xsl:choose>
												<xsl:when test="Descrizione/*">
													<div class='last'><pre>
														<xsl:for-each select="Descrizione/*[not(name()='ESCLUSIONE')]">
															<xsl:apply-templates select="." mode="process-description"/>
															<xsl:if test="position() != last()">
																<br/>
															</xsl:if>
														</xsl:for-each>
													</pre></div>
													<xsl:for-each select="Descrizione/ESCLUSIONE">
														<div class='last'>Sono escluse le seguenti attività: <br/><pre><xsl:value-of select="."/></pre></div>
													</xsl:for-each>
												</xsl:when>
												<xsl:otherwise>
													<div class='last'><pre><xsl:value-of select="Descrizione"/></pre></div>
												</xsl:otherwise>
											</xsl:choose>
										</xsl:otherwise>
									</xsl:choose>
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

	<xsl:template match="*" mode="process-description">
		<xsl:copy>
			<xsl:apply-templates select="@*|node()" mode="process-description"/>
		</xsl:copy>
	</xsl:template>

	<xsl:template match="text()" mode="process-description">
		<xsl:value-of select="."/>
	</xsl:template>

</xsl:stylesheet>