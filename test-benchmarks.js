import { runAllBenchmarks, simulateTruckPack, DIVERSE_BENCHMARKS } from './functions/api/packingEngine.js';

console.log("================================================================================");
console.log("  RIVER VALLEY CLEANUP CREW - 25 DIVERSE REAL-WORLD BENCHMARK SIMULATION TESTS  ");
console.log("================================================================================");

const results = runAllBenchmarks();
let passCount = 0;

results.forEach(r => {
  const status = r.passed ? "PASS" : "WARN";
  if (r.passed) passCount++;
  console.log(`[#${String(r.id).padStart(2, '0')}] ${r.name}`);
  console.log(`     Vehicle: ${r.recommendedVehicle.toUpperCase()} | Load: ${r.loadFraction}`);
  console.log(`     Volume: ${r.volumeCubicYards} cu yd | Weight: ${r.totalWeightLbs} lbs`);
  console.log(`     Labor: ${r.estimatedLaborHours} hr ($${r.laborCostTotal} labor @ $25/hr) | Crew: ${r.crew}`);
  console.log(`     Test Result: [${status}]`);
  console.log("--------------------------------------------------------------------------------");
});

console.log(`SUMMARY: ${passCount} / ${results.length} Benchmarks Passed.`);
