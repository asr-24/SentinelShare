const AuthenticationLogging = artifacts.require("AuthenticationLogging");

module.exports = function (deployer) {
  deployer.deploy(AuthenticationLogging);
};
