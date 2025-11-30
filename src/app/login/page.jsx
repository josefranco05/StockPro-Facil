"use client";
import React, { useState } from "react";
import {
    Box,
    Button,
    Card as MuiCard,
    Checkbox,
    FormLabel,
    FormControl,
    FormControlLabel,
    Link,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
    IoEyeOutline,
    IoEyeOffOutline,
    IoLockClosedOutline,
    IoPersonOutline,
} from "react-icons/io5";

const PageWrapper = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(6, 2),
    background:
        "radial-gradient(circle at 20% 20%, rgba(67, 97, 238, 0.2), transparent 35%), radial-gradient(circle at 80% 0%, rgba(255, 255, 255, 0.1), transparent 30%), linear-gradient(135deg, #0a102a, #0f172a 50%, #101b46)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
        content: '""',
        position: "absolute",
        inset: 0,
        background: "radial-gradient(circle at 70% 50%, rgba(76, 201, 240, 0.18), transparent 25%)",
        filter: "blur(60px)",
        zIndex: 0,
    },
}));

const Card = styled(MuiCard)(({ theme }) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    maxWidth: 520,
    padding: theme.spacing(4.5),
    gap: theme.spacing(3),
    borderRadius: theme.spacing(3),
    background: "rgba(9, 14, 40, 0.6)",
    color: "#f8fbff",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(12px)",
    boxShadow:
        "0 20px 70px rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
}));

const Pill = styled("div")(({ theme }) => ({
    display: "inline-flex",
    alignItems: "center",
    gap: theme.spacing(1),
    padding: theme.spacing(0.75, 1.5),
    borderRadius: 999,
    background: "linear-gradient(120deg, rgba(80, 115, 255, 0.18), rgba(120, 255, 214, 0.18))",
    color: "#e4ebff",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    fontSize: "0.85rem",
    letterSpacing: 0.3,
}));

export default function LoginCard() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);

    const handleTogglePassword = () => setShowPassword(!showPassword);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoadingLogin(true);

        if (!username || !password) {
            toast.error("Todos los campos son obligatorios");
            setLoadingLogin(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Error en el login");
                setLoadingLogin(false);
                return;
            }

            toast.success("Inicio de sesión exitoso");
            router.push("/dashboard");
        } catch (err) {
            toast.error("Error de conexión con el servidor");
        } finally {
            setLoadingLogin(false);
        }
    }

    return (
        <PageWrapper>
            <Card variant="outlined">
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box>
                        <Typography variant="overline" sx={{ letterSpacing: 1.5, color: "rgba(255,255,255,0.7)" }}>
                            Bienvenido de vuelta
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: "100%", fontSize: "clamp(2.1rem, 4vw, 2.6rem)", fontWeight: 700 }}
                        >
                            Inicia sesión
                        </Typography>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)", mt: 0.5 }}>
                            Accede al panel para monitorear inventario y operaciones.
                        </Typography>
                    </Box>
                    <Pill>
                        <Box
                            sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: "linear-gradient(135deg, #6ee7ff, #7c3aed)",
                                boxShadow: "0 0 12px rgba(108, 255, 255, 0.6)",
                            }}
                        />
                        InvTrack
                    </Pill>
                </Box>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <FormControl>
                        <FormLabel htmlFor="username" sx={{ color: "rgba(255,255,255,0.8)", mb: 0.8 }}>
                            Usuario
                        </FormLabel>
                        <TextField
                            id="username"
                            name="username"
                            placeholder="nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IoPersonOutline size={20} color="#9fb3ff" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "rgba(255,255,255,0.06)",
                                    color: "#e8edff",
                                    "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
                                    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                    "&.Mui-focused fieldset": { borderColor: "#7c8aff" },
                                },
                            }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel htmlFor="password" sx={{ color: "rgba(255,255,255,0.8)", mb: 0.8 }}>
                            Contraseña
                        </FormLabel>
                        <TextField
                            name="password"
                            placeholder="••••••••"
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IoLockClosedOutline size={20} color="#9fb3ff" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    backgroundColor: "rgba(255,255,255,0.06)",
                                    color: "#e8edff",
                                    "& fieldset": { borderColor: "rgba(255,255,255,0.12)" },
                                    "&:hover fieldset": { borderColor: "rgba(255,255,255,0.3)" },
                                    "&.Mui-focused fieldset": { borderColor: "#7c8aff" },
                                },
                            }}
                        />
                    </FormControl>

                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Mantener sesión iniciada"
                        sx={{ color: "rgba(255,255,255,0.85)" }}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={loadingLogin}
                        sx={{
                            py: 1.2,
                            fontWeight: "bold",
                            background: "linear-gradient(120deg, #4f46e5, #0ea5e9)",
                            boxShadow: "0 10px 30px rgba(14,165,233,0.35)",
                            "&:hover": {
                                background: "linear-gradient(120deg, #4338ca, #0284c7)",
                                boxShadow: "0 12px 32px rgba(99,102,241,0.4)",
                            },
                        }}
                    >
                        {loadingLogin ? "Iniciando..." : "Entrar"}
                    </Button>

                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 1 }}>
                        <Link
                            component="button"
                            type="button"
                            variant="body2"
                            sx={{ color: "#9fb3ff" }}
                            onClick={() => alert("Recuperación de contraseña próximamente")}
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                        <Typography sx={{ textAlign: "right", color: "rgba(255,255,255,0.8)" }}>
                            ¿Aún no tienes cuenta?{" "}
                            <Link href="/register" variant="body2" sx={{ color: "#8ae8ff", fontWeight: 700 }}>
                                Regístrate
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </PageWrapper>
    );
}
