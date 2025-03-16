async function main() {
  const Agreement = await ethers.getContractFactory("Agreement");

  // Start deployment, returning a promise that resolves to a contract object
  const Agreement_ = await Agreement.deploy();
  console.log("Contract address:", Agreement_.address);


}

main()
 .then(() => process.exit(0))
 .catch(error => {
   console.error(error);
   process.exit(1);
 });

 //Contract address:0x40CD78dAb2afC6b05d0383411d31f88DE15E9227