"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { Spinner } from "@/components/Spinner";
import Image from "next/image";

type AuthContextType = {
  isLoggedIn: boolean;
  userData: IUser | null;
  setUserData: React.Dispatch<React.SetStateAction<IUser | null>>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
  children: ReactNode;
};

interface IUser {
  id: number;
  nome: string;
  email: string;
  tipo: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/check`,
        {
          withCredentials: true,
        }
      );

      if (response.data.authenticated) {
        const userData = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/usuarios/${response.data.usuario.id}`,
          {
            withCredentials: true,
          }
        );
        setUserData({
          id: response.data.usuario.id,
          nome: userData.data.nome,
          email: userData.data.email,
          tipo: response.data.usuario.tipo,
        });
        setIsLoggedIn(true);
      } else {
        setUserData(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      setUserData(null);
      setIsLoggedIn(false);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  const login = async () => {
    await checkAuth();
  };

  const logout = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    setUserData(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, userData, setUserData }}
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-content-secondary text-content-primary">
          <Image src={require("@/assets/logo.png")} alt="Logo" width={300} height={300} />
          <Spinner className="border-content-primary" />
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
