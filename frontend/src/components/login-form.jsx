import { useState } from "react";
import { useLoginMutation } from "../app/services/userApi"; // Импорт хука для логина
import {  useNavigate } from "react-router-dom"; // Для навигации
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm({ className,setSelected, ...props }) {
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [loginUser, { isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await loginUser(formData).unwrap();
      console.log("Успешный вход:", result);
      localStorage.setItem('token', result.token);

      if (result.role === 'admin') {
        navigate('/admin')
      } else {
         navigate("/user");
      }
    } catch (err) {
      console.error("Ошибка при входе:", err);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Войдите в свой аккаунт</CardTitle>
          <CardDescription>
            Введите свой логин и пароль чтобы войти в аккаунт
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="login">Login</Label>
                <Input
                  id="login"
                  name="login"
                  type="text"
                  placeholder="Enter your login"
                  required
                  value={formData.login}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                <Button variant="outline" className="w-full">
                  Login with Google
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}

              <span
                onClick={() => setSelected('register')}
                className="underline underline-offset-4 cursor-pointer text-blue-500"
              >
                Зарегистрироваться
              </span>

            </div>
            {isError && (
              <div className="text-red-500 text-sm mt-2">
                Ошибка при входе. Неверный логин или пароль.
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
