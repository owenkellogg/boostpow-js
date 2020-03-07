'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('boost #BoostPowJob redeem work', () => {

   it('should success create', async () => {
      const jobProof = index.BoostPowJobProof.fromObject({
         signature: '0000000000000000000000000000000000000000000000000000000000000001',
         minerPubKey: '0000000000000000000000000000000000000000000000000000000000000001',
         time: '00000001',
         minerNonce: '0000000000000001',
         minerAddress: '0000000000000000000000000000000000000001',
      });

      const jobObj = jobProof.toObject();
      expect(jobObj).to.eql({
         signature: '0000000000000000000000000000000000000000000000000000000000000001',
         minerPubKey: '0000000000000000000000000000000000000000000000000000000000000001',
         time: '00000001',
         minerNonce: '0000000000000001',
         minerAddress: '0000000000000000000000000000000000000001',
      });
   });

   it('should success create hex ', async () => {
      const jobProof = index.BoostPowJobProof.fromObject({
         signature: '0000000000000000000000000000000000000000000000000000000000000001',
         minerPubKey: '0000000000000000000000000000000000000000000000000000000000000001',
         time: '00000001',
         minerNonce: '0000000000000001',
         minerAddress: '0000000000000000000000000000000000000001',
      });
      const jobObj = jobProof.toObject();
      expect(jobObj).to.eql({
         signature: '0000000000000000000000000000000000000000000000000000000000000001',
         minerPubKey: '0000000000000000000000000000000000000000000000000000000000000001',
         time: '00000001',
         minerNonce: '0000000000000001',
         minerAddress: '0000000000000000000000000000000000000001',
      });
      expect(jobProof.toHex()).to.eql('2001000000000000000000000000000000000000000000000000000000000000002001000000000000000000000000000000000000000000000000000000000000000401000000080100000000000000140100000000000000000000000000000000000000');
      expect(jobProof.toHex()).to.eql('2001000000000000000000000000000000000000000000000000000000000000002001000000000000000000000000000000000000000000000000000000000000000401000000080100000000000000140100000000000000000000000000000000000000');
      const fromHex = index.BoostPowJobProof.fromHex('2001000000000000000000000000000000000000000000000000000000000000002001000000000000000000000000000000000000000000000000000000000000000401000000080100000000000000140100000000000000000000000000000000000000');
      const hexAgain = fromHex.toHex();
      expect(jobProof.toHex()).to.eql(hexAgain);
   });

   it('should success create asm and string', async () => {
      const jobProof = index.BoostPowJobProof.fromObject({
         signature: '0000000000000000000000000000000000000000000000000000000000000001',
         minerPubKey: '0000000000000000000000000000000000000000000000000000000000000001',
         time: '00000001',
         minerNonce: '0000000000000001',
         minerAddress: '0000000000000000000000000000000000000001',
      });

      const jobObj = jobProof.toObject();
      expect(jobObj).to.eql({
         signature: '0000000000000000000000000000000000000000000000000000000000000001',
         minerPubKey: '0000000000000000000000000000000000000000000000000000000000000001',
         time: '00000001',
         minerNonce: '0000000000000001',
         minerAddress: '0000000000000000000000000000000000000001',
      });

      expect(jobProof.toString()).to.eql('32 0x0100000000000000000000000000000000000000000000000000000000000000 32 0x0100000000000000000000000000000000000000000000000000000000000000 4 0x01000000 8 0x0100000000000000 20 0x0100000000000000000000000000000000000000');

      const fromString = index.BoostPowJobProof.fromString('32 0x0100000000000000000000000000000000000000000000000000000000000000 32 0x0100000000000000000000000000000000000000000000000000000000000000 4 0x01000000 8 0x0100000000000000 20 0x0100000000000000000000000000000000000000');

      expect(jobProof.toASM()).to.eql(fromString.toASM());

      expect(jobProof.toASM()).to.eql('0100000000000000000000000000000000000000000000000000000000000000 0100000000000000000000000000000000000000000000000000000000000000 01000000 0100000000000000 0100000000000000000000000000000000000000');
   });

   it('should update minerNonce and time', async () => {
      const jobProof = index.BoostPowJobProof.fromObject({
         signature: '0000000000000000000000000000000000000000000000000000000000000001',
         minerPubKey: '0000000000000000000000000000000000000000000000000000000000000001',
         time: '00000001',
         minerNonce: '0000000000000001',
         minerAddress: '0000000000000000000000000000000000000001',
      });

      // Important so we can create a mini cpu miner to just update the relevant sections quickly
      jobProof.setMinerNonce('0000000000000002');
      jobProof.setTime('12300009');

      expect(jobProof.toObject()).to.eql({
         signature: '0000000000000000000000000000000000000000000000000000000000000001',
         minerPubKey: '0000000000000000000000000000000000000000000000000000000000000001',
         time: '12300009',
         minerNonce: '0000000000000002',
         minerAddress: '0000000000000000000000000000000000000001',
      });

      expect(jobProof.toString()).to.eql('32 0x0100000000000000000000000000000000000000000000000000000000000000 32 0x0100000000000000000000000000000000000000000000000000000000000000 4 0x09003012 8 0x0200000000000000 20 0x0100000000000000000000000000000000000000');
    });
});
