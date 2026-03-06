tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#1A1A1A', light: '#333333', dark: '#0D0D0D' },
        accent: { DEFAULT: '#999999', light: '#AAAAAA', dark: '#666666' },
        carbon: { DEFAULT: '#0A0A0A', light: '#1A1A1A' },
        mist: '#333333',
        cloud: '#1A1A1A',
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        accent: ['"Space Grotesk"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'draw': 'draw 2s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-right': 'slideRight 0.8s ease-out forwards',
        'bounce-subtle': 'bounceSub 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        draw: {
          to: { strokeDashoffset: '0' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideRight: {
          from: { opacity: '0', transform: 'translateX(-40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        bounceSub: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
}
