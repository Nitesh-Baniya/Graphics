const algoDescription = document.getElementById('algoDescription');
const algoStepInfo = document.getElementById('algoStepInfo');

const algoInfos = {
    dda: `<p><strong>DDA Line Algorithm</strong>: Uses incremental calculation to draw lines.</p>
        <p>Pseudocode: <br>
        Initialize x, y;<br>
        Calculate steps;<br>
        Increment x and y stepwise;<br>
        Plot pixels.</p>`,
    bresenham: `<p><strong>Bresenham's Line Algorithm</strong>: Uses integer calculations to efficiently determine pixels closest to a line.</p>
              <p>Pseudocode:<br>
              Initialize error term;<br>
              For each step, update error;<br>
              Choose pixel based on error;<br>
              Plot pixels.</p>`,
    circle: `<p><strong>Midpoint Circle Algorithm</strong>: Efficiently determines points for circle by using symmetry and decision parameter.</p>
           <p>Pseudocode:<br>
           Start at top point;<br>
           Calculate decision parameter;<br>
           Move clockwise and update decision;<br>
           Plot symmetrical points.</p>`,
    ellipse: `<p><strong>Midpoint Ellipse Algorithm</strong>: Uses region-wise decision parameters to plot ellipse points with symmetry.</p>
            <p>Pseudocode:<br>
            Plot points in Region 1 with one decision param;<br>
            Switch to Region 2 with another decision param;<br>
            Plot symmetrical points.</p>`
};


export function updateAlgorithmInfo(algo) {
    algoDescription.innerHTML = algoInfos[algo] || '';
    algoStepInfo.innerHTML = '';
}

export function updateStepInfo(info) {
    algoStepInfo.innerHTML = info || '';
}
