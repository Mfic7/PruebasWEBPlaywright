module.exports = {
  default: {
    require: [
      './src/test/steps/*.ts',
      './src/test/hooks.ts',
      './src/test/world.ts'
    ],
    format: ["progress-bar", "html:test-results/cucumber-report.html"],
    requireModule: ["ts-node/register"],
    paths: ["./src/test/features/*.feature"],
    timeout: 20000  // Aumentar el tiempo de espera global a 20 segundos
  }
};
