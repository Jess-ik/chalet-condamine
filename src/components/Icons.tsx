export const icons: { [key: string]: JSX.Element } = {
    Aspirateur: <AspirateurIcon />,
    
  };
  
  export function getIconComponent(iconName: string): JSX.Element | null {
    return icons[iconName] || null;
  }
  
  
function AspirateurIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="none">
        <path
          stroke="#3C3C3C"
          strokeWidth="2"
          d="M11 9.5h24a1 1 0 011 1v24a1 1 0 01-1 1H11a1 1 0 01-1-1v-24a1 1 0 011-1zm25 8H10"
        ></path>
        <path
          fill="#3C3C3C"
          d="M32 12.5a1 1 0 110 2 1 1 0 010-2zm-6 0a1 1 0 110 2 1 1 0 010-2zm-6 0a1 1 0 110 2 1 1 0 010-2zm-6 0a1 1 0 110 2 1 1 0 010-2z"
        ></path>
        <path
          stroke="#3C3C3C"
          strokeWidth="2"
          d="M14 21.5h18v10H14v-10zm22-4H10"
        ></path>
      </svg>
    );
  }
  
