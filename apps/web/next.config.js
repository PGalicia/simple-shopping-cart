/** @type {import('next').NextConfig} */
const { withNx } = require("@nx/next");

const nextConfig = {
  nx: {
    svgr: false,
  },
};

module.exports = withNx(nextConfig);
