export default [
	{
		defaultValue: false,
		description: "Low quality, pixel art texture filtering.",
		key: "point",
		name: "Point Sampling",
		type: "string",
		under: "sampling",
		value: 1
	},
	{
		defaultValue: false,
		description: "Medium quality texture filtering.",
		key: "trilinear",
		name: "Trilinear Sampling",
		type: "string",
		under: "sampling",
		value: 2
	},
	{
		defaultValue: false,
		description: "Clamp S coordinates.",
		key: "s",
		name: "Clamp S",
		under: "clamp",
		value: 4
	},
	{
		defaultValue: false,
		description: "Clamp T coordinates.",
		key: "t",
		name: "Clamp T",
		under: "clamp",
		value: 8
	},
	{
		defaultValue: false,
		description: "High quality texture filtering.",
		key: "anisotropic",
		name: "Anisotropic Sampling",
		type: "string",
		under: "sampling",
		value: 16
	},
	{
		defaultValue: false,
		description: "Used in [[skybox]]es. Makes sure edges are seamless.",
		key: "hintDXT5",
		name: "Hint DXT5",
		value: 32
	},
	{
		defaultValue: false,
		description: "Purpose unknown. (piece wise linear functions maybe?)",
		key: "pwl",
		name: "PWL Corrected",
		value: 64
	},
	{
		defaultValue: false,
		description: "Texture is a normal map.",
		key: "normalMap",
		name: "Normal Map",
		value: 128
	},
	{
		defaultValue: false,
		description: "Render largest mipmap only. (Does not delete existing mipmaps, just disables them.)",
		key: "mipmaps",
		name: "No Mipmaps",
		type: "reverse",
		value: 256
	},
	{
		defaultValue: false,
		description: "Not affected by texture resolution settings.",
		key: "detail",
		name: "No Level Of Detail",
		type: "reverse",
		value: 512
	},
	{
		defaultValue: false,
		description: "If set, load mipmaps below 32x32 pixels.",
		key: "minimumMipmap",
		name: "No Minimum Mipmap",
		type: "reverse",
		value: 1024
	},
	{
		defaultValue: false,
		description: "Texture is an procedural texture (code can modify it).",
		key: "procedural",
		name: "Procedural",
		value: 2048
	},
	{
		defaultValue: false,
		description: "One bit alpha channel used.",
		key: "one",
		name: "One Bit Alpha",
		type: "string",
		under: "alphaBits",
		value: 4096
	},
	{
		defaultValue: true,
		description: "Eight bit alpha channel used.",
		key: "eight",
		name: "Eight Bit Alpha",
		type: "string",
		under: "alphaBits",
		value: 8192
	},
	{
		defaultValue: false,
		description: "Texture is an environment map.",
		key: "environment",
		name: "Environment Map",
		type: "string",
		under: "type",
		value: 16384
	},
	{
		defaultValue: false,
		description: "Texture is a render target.",
		key: "render",
		name: "Render Target",
		type: "string",
		under: "type",
		value: 32768
	},
	{
		defaultValue: false,
		description: "Texture is a depth render target.",
		key: "depthRender",
		name: "Depth Render Target",
		type: "string",
		under: "type",
		value: 65536
	},
	{
		defaultValue: false,
		description: "",
		key: "debugOverride",
		name: "No Debug Override",
		type: "reverse",
		value: 131072
	},
	{
		defaultValue: false,
		description: "",
		key: "single",
		name: "Single Copy",
		value: 262144
	},
	{
		defaultValue: false,
		description: "SRGB correction has already been applied",
		key: "preSRGB",
		name: "Pre SRGB",
		value: 524288
	},
	{
		defaultValue: false,
		description: "(Internal to VTEX?)",
		key: "premultiply",
		name: "Premultiply Color By One Over Mipmap Level",
		value: 1048576
	},
	{
		defaultValue: false,
		description: "Texture is a DuDv map. (Internal to VTEX?)",
		key: "dudv",
		name: "Normal To DuDv",
		type: "string",
		under: "type",
		value: 2097152
	},
	{
		defaultValue: false,
		description: "(Internal to VTEX?)",
		key: "alphaTest",
		name: "Alpha Test Mipmap Generation",
		value: 4194304
	},
	{
		defaultValue: false,
		description: "Do not [http://en.wikipedia.org/wiki/Z-buffer buffer] for Video Processing, generally render distance.",
		key: "depthBuffer",
		name: "No Depth Buffer",
		type: "reverse",
		value: 8388608
	},
	{
		defaultValue: false,
		description: "Use [[NICE filtering]] to generate mipmaps. (Internal to VTEX?)",
		key: "nice",
		name: "Nice Filtered",
		value: 16777216
	},
	{
		defaultValue: false,
		description: "Clamp U coordinates (for volumetric textures).",
		key: "u",
		name: "Clamp U",
		under: "clamp",
		value: 33554432
	},
	{
		defaultValue: false,
		description: "Usable as a vertex texture",
		key: "asVertex",
		name: "Vertex Texture",
		value: 67108864
	},
	{
		defaultValue: false,
		description: "Texture is a [[$ssbump|SSBump]]. (''SSB'')",
		key: "ssbump",
		name: "SSBump",
		value: 134217728
	},
	{
		defaultValue: false,
		description: "Clamp to border colour on all texture coordinates",
		key: "border",
		name: "Border",
		under: "clamp",
		value: 536870912
	}
];
