declare hide_on_intraday;
declare lower;

#Bad Data Handling 
input removeBadTicks = yes;
input badTickFilter = 3.0;

#Historical Volatility Settings
input hvLongLength = 252;
input hvShortLength = 20;

#Range Bands Settings
input upperBandPercent = 20;
input midBandPercent = 20;
input lowerBandPercent = 20;


#Calculate HV
def clLog = log(close / close[1]);
plot hv = stdev(clLog, hvShortLength) * Sqrt(hvShortLength * hvLongLength / (hvShortLength - 1)) * 100;
def highHV = Highest(hv, hvLongLength);
def lowHV = Lowest(hv, hvLongLength);


#Calculate IV
def curIV = if(IsNaN(imp_volatility()) and !IsNaN(hv), -1, imp_volatility());
rec cleanIV = if((curIV between Max((cleanIV[1] - badTickFilter), 0) and (cleanIV[1] + badTickFilter)), curIV, cleanIV[1]);
plot iv = round(if(removeBadTicks, cleanIV, imp_volatility()) * 100);


def totalRange = highHV - lowHV;

#Plot Bands
plot upperBandTop = highHV;
plot upperBandBottom = upperBandTop - (totalRange * (upperBandPercent/100));

plot midBandTop = highHV - (totalRange * ((100 - midBandPercent)/100))/2;
plot midBandBottom = lowHV + (totalRange * ((100 - midBandPercent)/100))/2;

plot lowerBandBottom = lowHV;
plot lowerBandTop = lowerBandBottom + (totalRange * (lowerBandPercent/100));

#Setting default look
hv.SetDefaultColor(color.BLUE);
hv.SetLineWeight(2);
iv.SetDefaultColor(color.RED);
iv.SetLineWeight(2);

upperBandTop.SetDefaultColor(color.GRAY);
AddCloud(upperBandTop, upperBandBottom, color.GREEN);
upperBandBottom.SetDefaultColor(color.GRAY);

midBandTop.SetDefaultColor(color.GRAY);
AddCloud(midBandTop, midBandBottom, color.Yellow);
midBandBottom.SetDefaultColor(color.GRAY);

lowerBandTop.SetDefaultColor(color.GRAY);
AddCloud(lowerBandTop, lowerBandBottom, color.RED);
lowerBandBottom.SetDefaultColor(color.GRAY);
